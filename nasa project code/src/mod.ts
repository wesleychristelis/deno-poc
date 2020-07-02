// Third party dependencies
import { 
  log, 
  Application, 
  send } from "./deps.ts";

import api from "./api.ts";
  
const app = new Application();
const PORT = 8000;

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("INFO"),
  },
  loggers: {
    default: {
      level: "INFO",
      handlers: ["console"],
    },
  },
});

 // Event listener to listen for all uncaught errors that Oak generates an event for
 app.addEventListener("error", (event) => {
  log.error(event.error);
 });

// Middleware pipeline
// Error handling in the middelware pipeline
app.use(async(ctx,next) => {
    try{
      await next()
    } catch(err){
      ctx.response.body = "Internal server error";
      throw err;
    }
});

app.use(async (ctx,next)=>{
    await next(); // call downstream middelware
    const time = ctx.response.headers.get("X-Response-Time");
    log.info(`${ctx.request.method} ${ctx.request.url}: ${time}`)
});

app.use(async (ctx, next)=>{
    //Date time when request started and completed
    // Start of epoch
    const start = Date.now();
    // call downstream middleware
    await next();
    const delta = Date.now() - start;
    ctx.response.headers.set("X-Response-Time",`${delta}ms`)
});

// Catch API routes
app.use(api.routes());
app.use(api.allowedMethods());

//Static file middleware
app.use(async (ctx) => {
    const filePath = ctx.request.url.pathname;
    log.info(`filePath: ${filePath}`);

    const fileWhitelist = [
      "/index.html",
      "/javascripts/script.js",
      "/stylesheets/style.css",
      "/images/favicon.png",
      "/videos/world.mp4",
    ];

    // if the request path is in the whitelisted paths
    if (fileWhitelist.includes(filePath)) {
        log.info(`root: ${Deno.cwd()}/public${fileWhitelist[0]} ...`);
        await send(ctx, filePath, {
            root: `${Deno.cwd()}/public`,
        });
    }
  });

if (import.meta.main) {
    //log.info(`Starting server on port ${PORT}...`);
    log.info(`Starting server on port ${PORT}...`);
    await app.listen({
      port: PORT,
    });
  }
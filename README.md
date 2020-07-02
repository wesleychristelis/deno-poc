# NASA Mission Control Deno POC Project

## What is this repository for?
* Small POC using deno.
  * Nasa Mission Control:
    * Allows you to created Nasa Missions to exoplanets, 
    * Views upcoming launches, 
    * historical launches. 
    * Create "Mission" to an exo planet
  * Uses Nasa planets exo planet archive data that has been downbloaded into a CSV. (http://exoplanetarchive.ipac.caltech.edu)
  * Also Queries SpaceX Api for Launch data. (https://github.com/r-spacex/SpaceX-API)
 
## Installation

1. Ensure you have Deno installed: https://deno.land/
2. In the terminal, run: `deno run -A Drakefile.ts start`

## Development

1. Install denon: `deno run -A Drakefile.ts denon-install`
2. In the terminal, run: `deno run -A Drakefile.ts denon`

## Docker Compose

1. Ensure you have the latest version of Docker and Docker Compose installed
1. Run `docker-compose up --build api`

## Backend API

Ensure the backend is running by making a GET request to http://localhost:8000/

## Front End

Browse to the Mission Control front end at http://localhost:8000/index.html and schedule an interstellar mission launch!

## Locking Dependencies

After adding a dependency, run `deno run -A Drakefile.ts cache` to update the local module cache and create a corresponding lock file. This lock file can then be added to the repository.

# Additional Info:

## My Envirnronment info 
* VSCode Dev env 
* Deno PLugion installed (denoland.vscode-deno) by Denoland for intellisense
* .zprofile entries (zsh bash used)
  * export DENO_INSTALL="/Users/{username}/.deno"
  * export PATH="$DENO_INSTALL/bin:$PATH"

## How do I get set up? ###
* Dependencies (see dep.ts)
  * Oak
  * Lodash
  * Deno Standard Lib
* Database configuration
* How to run tests (https://deno.land/manual/testing)
  * Deno includes a test runner out of the box:
    * 1. There is a test runner in the CLI
    * 2. Assertions in the STL
    * 3. Built in test driven fixtures with Deno.test()
  * CLI FROM the root directory:
    * Run all tests: deno test --allow-read
    * Run specific files tests: deno test {path to file} --allow-read 
      * e.g. deno test src/models/planets.test.ts --allow-read 

## My Approach to testing 
I personally don't think there's a wrong way to go with testing as long as you do it. 
What I do myself is if I notice I'm writing a piece of code.
With several different branches or possible paths through the code. planets
filter where a planet can be filtered based on whether it's confirmed or not, and based on any
of repective criteria where a value can be less than or greater than the required amount.
In these cases, writing the tests in parallel with the code helps me maintain context on what I'm trying
to achieve. And it also forces me to consider and handle all of the different possibilities in my code.
As I am writing it, this leads to better code.

## Deno Manual
https://deno.land/manual

### External Depedencies and production usage of modules
https://deno.land/manual/linking_to_external_code#but-what-if-the-host-of-the-url-goes-down-the-source-wont-be-available
* Recommended to set you $DENO_DIR and Push to repo. 

## Deno Features
* Built in Typescript Compiler
* Browser Compatible API
* Built in ES Modules
* More secure 
  * Packages need permission to do things.
  * 2 principles that Deno follows
    * Whitelisting
    * Least privielge
* Decentralised modules 
* Has a standard library
  * Built in tooling , its own file watcher, trst libs etc
* Deno API  (https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts)
* Optionated Modules 
* Single executable
* Async always returns a promise.

## Info
* "Drake" is the task runner for deno (derivatove of "make") (https://github.com/srackham/drake)

## Deno Architecture
* Deno is written in "Rust"
  * Safer memory management then C and C++ (unlike node).
  * Anything that falls outside of the JS world gets parsed through to the Rust world via the Deno API.
* Asynchronous IO
  * Using non blocking Event loops in the Tokio Library (a Rust project)which has thread pool and workers.
  * WHY use tokio ??? Node uses LibUv (using c) and would need building bridges to neccesitate "futures". Tokio has "futures" abstractions.
* How it handles typescript 
  * (.ts file -> compiler -> js -> V8 Engine -> )
* How it handles javscript 
  * (js file -> V8 Engine -> )
* Deno has a thing called "rusty-v8"
* How it handles no JS type commands (Deno API) (Similar to Node Arch)
  * (js -> Deno API -> Rusty Engine -> Tokyo Worker -> Rusty V8 Engine -> js )

## Versioning of Modules
* Where is package.json ???
  * deno best practoce recommends using a deps.ts file. Deps are now declared using typescript.
  * This deps.ts file is then import to you respective modules
  * To lock you deps you create a lock.json file and can be populated when you cache you deps. 
    * "deno cache --lock=lock.json --lock-write src/deps.ts"
    * deno run --allow-read --allow-net --lock-write --lock=lock.json  mod.ts
    * Deno creates a SHA hash of each dep. to compare or check that they have not been tampered with, you run the below. It will maych the hashes 
      * deno run --allow-read --allow-net --lock=lock.json  mod.ts
* Most modules take on the "go" convention where modules are named "mod.ts"
* Version in is the url e.g. https://deno.land/x/drake@v1.2.0/mod.ts

## Tooling 

## Refs
https://github.com/odziem/nasa-deno
http://3.84.81.123:8000/index.html


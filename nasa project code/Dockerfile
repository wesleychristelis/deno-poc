# Select base image 
FROM hayd/deno:alpine-1.1.1

# Set working directory of the application
WORKDIR /app

# Copy binaries from source directory to working directory (current to current)
COPY . .

# Set user and not run as "root" 
USER deno

# params into deno executable
CMD ["run", "--allow-read", "--allow-net", "src/mod.ts"]

# Expose port
EXPOSE 8000

# Run Image

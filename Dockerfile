# We are using node's image as base for this one
FROM node:16 as base

# Create the app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./
COPY pnpm-lock.yaml ./
EXPOSE 3000

FROM base as test
RUN pnpm install
COPY . .
CMD ["pnpm", "lint"]
CMD ["pnpm", "test"]

FROM base as build
RUN pnpm install
COPY . .
RUN pnpm build

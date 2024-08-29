FROM node:18-alpine

# Installing dependencies for sharp compatibility
RUN apk update && apk add --no-cache \
  autoconf \
  automake \
  bash \
  build-base \
  gcc \
  git \
  libpng-dev \
  nasm \
  vips-dev \
  zlib-dev

WORKDIR /opt/
COPY package.json ./
RUN npm install -g node-gyp && npm config set fetch-retry-maxtimeout 600000 -g && npm install

# ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .
RUN chown -R node:node /opt/app
USER node
RUN ["npm", "run", "build"]
EXPOSE 1337
CMD ["npm", "run", "develop"]

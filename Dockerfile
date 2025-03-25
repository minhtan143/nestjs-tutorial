FROM node:22.13.1-alpine AS development
WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

FROM development AS migration
WORKDIR /app

CMD npm run migration:run

FROM node:22.13.1-alpine AS build
WORKDIR /app

COPY package*.json .
COPY --from=development /app/node_modules ./node_modules
COPY . .

RUN npm run build

ENV NODE_ENV=production
RUN npm ci --only=production && npm cache clean --force

FROM node:22.13.1-alpine AS production
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

CMD ["node", "dist/main"]

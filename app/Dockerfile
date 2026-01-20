FROM node:20-bookworm-slim AS build
WORKDIR /app

COPY package*.json ./
RUN rm -rf node_modules package-lock.json \
 && npm cache clean --force \
 && npm install


COPY . .
RUN npm run build:fe

FROM node:20-bookworm-slim
WORKDIR /app
RUN npm install -g serve

COPY --from=build /app/dist ./dist
EXPOSE 5173
CMD ["serve","-s","dist","-l","5173"]

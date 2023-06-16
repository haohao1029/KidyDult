# Stage 1 - the build process
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - the production environment
FROM nginx
EXPOSE 80
COPY --from=build /app/build /usr/share/nginx/html
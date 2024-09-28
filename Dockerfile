FROM node:18-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
#RUN yarn build --mode development
RUN yarn build-real

FROM nginx:alpine

#COPY infrastructure/local/nginx/nginx.conf /etc/nginx/nginx.conf
COPY infrastructure/real/nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
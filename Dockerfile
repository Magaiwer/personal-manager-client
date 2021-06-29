FROM node:14-alpine as angular
WORKDIR /app
ARG API_PORT
ENV API_PORT="$API_PORT"
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/ /usr/share/nginx/html
COPY --from=angular app/config/replace_api_port.sh /
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["sh", "replace_api_port.sh"]
RUN echo $API_PORT

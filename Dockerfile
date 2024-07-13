# Use a lightweight HTTP server image
FROM node:22-alpine3.19

WORKDIR /

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "--env-file=.env", "app.js" ]
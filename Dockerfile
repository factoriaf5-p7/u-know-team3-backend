FROM node:18.16.1-alpine3.17

WORKDIR /user/uknow-backend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["node", "dist/main"]
FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

RUN yarn global add sequelize-cli

COPY . .

EXPOSE 3010

CMD ["node", "src/app.js"]
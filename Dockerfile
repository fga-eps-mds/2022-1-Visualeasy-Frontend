FROM node:alpine

RUN mkdir -p /visualeasy-front

WORKDIR /visualeasy-front

COPY package.json /visualeasy-front/

RUN yarn install

COPY . /visualeasy-front

EXPOSE 3000

CMD ["yarn", "dev"]
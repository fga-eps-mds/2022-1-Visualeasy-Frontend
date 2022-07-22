# Base image used
FROM node:16.16.0

WORKDIR /visualeasy-front

COPY ./package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD npm run dev

FROM node:20-alpine


WORKDIR /nextblog


COPY package.json yarn.lock ./


RUN yarn install --frozen-lockfile


COPY . .


EXPOSE 5000


CMD ["sh", "-c", "yarn migrate && yarn build && yarn start"]

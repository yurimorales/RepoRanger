FROM node:18

WORKDIR /app

COPY package.json ./
COPY public ./public

RUN npm install

COPY . .

CMD ["npm", "start"]
FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV DATABASE_URL=${DATABASE_URL}
ENV REDIS_URL=${REDIS_URL}

CMD ["npm", "run", "start"]

FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx prisma generate

ENV DATABASE_URL=${DATABASE_URL}
ENV REDIS_URL=${REDIS_URL}

CMD ["npm", "run", "start"]
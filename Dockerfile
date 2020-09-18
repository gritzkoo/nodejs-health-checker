FROM node:12
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
# CMD npm run dev
EXPOSE 8888

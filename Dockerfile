FROM node:23-slim
RUN apt update && apt upgrade -y && npm install -g npm@11.3.0

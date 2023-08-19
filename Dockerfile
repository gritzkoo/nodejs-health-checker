FROM node:20
RUN apt update && apt upgrade -y && apt install python3
RUN npm i -g npm --python=python3
ENV PYTHON=python3

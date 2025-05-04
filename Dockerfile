FROM node:23-slim
RUN apt update \
  && apt upgrade -y \
  && apt install python3 -y \
  && apt autoremove && apt clean \
  && npm install -g npm@11.3.0 --python=python3
ENV PYTHON=python3

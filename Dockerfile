FROM node:lts-slim
RUN apt update \
  && apt upgrade -y \
  && apt install python3 build-essential git -y \
  && apt autoremove && apt clean \
  && npm install -g npm@11.11.0 --python=python3
ENV PYTHON=python3

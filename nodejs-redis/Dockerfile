FROM mhart/alpine-node:7.2.1

RUN mkdir /src
WORKDIR /src

COPY package.json /src

# RUN npm config set proxy http://10.110.8.42:8080 && \
#	npm config set https-proxy http://10.110.8.42:8080

RUN npm install

COPY . /src

EXPOSE 8000
CMD [ "npm", "start" ]
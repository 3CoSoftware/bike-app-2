FROM node:14-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --silent 
COPY . .
EXPOSE 5000
RUN chown -R node /usr/src/app
USER node
CMD ["node", "server.js"]

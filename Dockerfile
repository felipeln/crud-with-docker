FROM node:14

# create app directory
WORKDIR /app

# copy package.json and package-lock.json to docker root directory
COPY package*.json ./

RUN npm install

# copy all project files to docker root directory
COPY . .

EXPOSE 2020

# command to be executed when container starts
CMD [ "npm", "run", "dev" ]
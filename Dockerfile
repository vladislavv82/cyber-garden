# Base image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN yarn

# Bundle app source
COPY . .

RUN npx prisma generate

# Creates a "dist" folder with the production build
RUN yarn run build

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]

# We use node 22 - NEW 
FROM node:22-slim

USER root

# Set app directory
WORKDIR /usr/src/app

#Copy all artifacts into image
COPY . .

# Install app dependencies ( node modules )
RUN npm install

# Expose Port in the Image
EXPOSE 8080

# Reset user from root to node
USER node

# We use CMD!
CMD [ "node", "./app.js" ]
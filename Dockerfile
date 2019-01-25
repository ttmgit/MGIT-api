FROM node:alpine

# Updates the alpine dist and install the openssh-server and client
RUN apk update && apk upgrade && apk add git

# Install runtime dependencies 
RUN npm install nps -g

RUN npm install yarn -g

# Setting up the workdir
WORKDIR /app

# Copy all files to the destination
COPY . /app

# Install TP dependencies
RUN yarn install

# Expose port
EXPOSE 3000

# Build and run TP
CMD nps serve
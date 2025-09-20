# Use official Node.js LTS image as base
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first to leverage cache
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start backend server
CMD [ "node", "server.js" ]

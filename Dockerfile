# Use Node.js official image
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of your app files
COPY . .

# Expose app port (commonly 3000)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

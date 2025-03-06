# Use Node.js LTS version as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install system dependencies required for development
RUN apk add --no-cache git

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables for Expo development
ENV NODE_ENV=development
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=localhost
ENV REACT_NATIVE_PACKAGER_HOSTNAME=localhost
ENV PORT=8081

# Expose Metro bundler port
EXPOSE 8081

# Start the Expo development server
CMD ["npm", "start", "--", "--port", "8081", "--host", "lan"]
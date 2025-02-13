# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Install dependencies and build frontend
RUN npm install
RUN npm run build

# Expose the frontend port
EXPOSE 3000

# Start the frontend app
CMD ["npm", "start"]

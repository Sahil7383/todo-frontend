# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Install dependencies and build frontend
RUN npm install --force
RUN npm run build

# Expose the frontend port
EXPOSE 5173

# Start the frontend app
CMD ["npm", "run", "dev"]

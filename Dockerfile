FROM node:20-slim

WORKDIR /

# Copy package files first (for caching)
COPY package*.json ./
RUN npm install --production

# Copy app source
COPY server.js .

EXPOSE 8080

CMD ["npm", "start"]

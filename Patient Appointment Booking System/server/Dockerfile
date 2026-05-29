FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json ./
COPY server/package.json server/package.json
RUN npm ci --omit=dev --workspace server

COPY server ./server
ENV NODE_ENV=production
EXPOSE 5000
CMD ["npm", "run", "start", "-w", "server"]

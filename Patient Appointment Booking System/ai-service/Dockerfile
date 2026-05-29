FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json ./
COPY ai-service/package.json ai-service/package.json
RUN npm ci --omit=dev --workspace ai-service

COPY ai-service ./ai-service
ENV NODE_ENV=production
EXPOSE 5001
CMD ["npm", "run", "start", "-w", "ai-service"]

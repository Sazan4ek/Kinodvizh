FROM node:18-slim

WORKDIR /app/

COPY react-kinodvizh/package*.json .

RUN npm i 

COPY react-kinodvizh/ .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]
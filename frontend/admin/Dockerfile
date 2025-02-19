FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install -g expo-cli
RUN npm install

COPY . .

ENV PORT=19006
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0

EXPOSE 19006
EXPOSE 8081

CMD ["npm", "run", "web"]

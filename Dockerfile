FROM node:10.15.3

ARG PORT=3039
ENV PORT=${PORT}

ARG CONFIG_NET=production
ENV CONFIG_NET=${CONFIG_NET}

WORKDIR /home/arisen-blockchain-explorer
COPY . /home/arisen-blockchain-explorer

RUN npm install -g pm2@2.10.4
RUN npm install -g @angular/cli@7.1.4
RUN cd /home/arisen-blockchain-explorer && npm install
RUN cd /home/arisen-blockchain-explorer && node patch
RUN cd /home/arisen-blockchain-explorer/server && npm install
RUN cd /home/arisen-blockchain-explorer && ng build --configuration=${CONFIG_NET} --optimization=false

CMD ["pm2-runtime", "/home/arisen-blockchain-explorer/server/ecosystem.config.js", "--web"]

EXPOSE ${PORT}
EXPOSE 9615

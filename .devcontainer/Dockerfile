FROM alpine AS src
COPY ./AnyDo /app/AnyDo
COPY ./Habitica /app/Habitica
COPY ./Promise /app/Promise
COPY ./index.js /app/

FROM mhart/alpine-node:16

RUN apk add git 

COPY ./package*json /app/
WORKDIR /app
# RUN npm install

COPY --from=src /app/ /app

COPY rootfs /

RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT [ "npm", "start" ] 
#CMD [ "600" ]

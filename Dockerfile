FROM alpine AS src
COPY ./AnyDo /app/AnyDo
COPY ./Habitica /app/Habitica
COPY ./Promise /app/Promise
COPY ./index.js /app/

FROM mhart/alpine-node:14 

COPY ./package*json /app/
WORKDIR /app
RUN npm install

COPY --from=src /app/ /app

COPY rootfs /

RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT [ "/usr/bin/entrypoint.sh" ] 
CMD [ "600" ]

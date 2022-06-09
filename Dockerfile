FROM alpine AS src
COPY ./AnyDo /app/AnyDo
COPY ./Habitica /app/Habitica
COPY ./Promise /app/Promise
COPY ./index.js /app/

FROM mhart/alpine-node:16

COPY ./package*json /app/
WORKDIR /app
RUN npm install

COPY --from=src /app/ /app

COPY rootfs /

ENV HABITICA_USER_ID=""
ENV HABITICA_API_TOKEN=""
ENV ANYDO_EMAIL=""
ENV ANYDO_PASSWORD=""
ENV ANYDO_IGNORE_LIST_IDS=""

RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT [ "/usr/bin/entrypoint.sh" ] 
CMD [ "600" ]

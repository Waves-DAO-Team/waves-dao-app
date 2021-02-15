FROM alpine AS build

RUN cat .env


#ARG BUILDPLATFORM="2
#ARG TARGETPLATFORM="1"
#ARG MEMBERSHIP
#ARG DISRUPTIVE
#ARG WEB3
#
#FROM node:14-alpine as source
#
#LABEL authors="Albert Iblyaminov <rieset@yandex.ru>" \
#      org.label-schema.vendor="Waves Association DAO" \
#      org.label-schema.name="Waves Association DAO Image" \
#      org.label-schema.description="Waves Association DAO" \
#      org.label-schema.url="https://dao.wavesassociation.org" \
#      org.label-schema.schema-version="1.0"
#
#ENV BUILD_DEPS="" \
#    RUNTIME_DEPS="" \
#    NODE_ENV="production" \
#    CONFIG="" \
#    NODE_OPTIONS="--max_old_space_size=2048" \
#    INTERHACK="" \
#    DISRUPTIVE_ISSUE_TEMPLATE="" \
#    WEB3_ISSUE_TEMPLATE="" \
#    INTERHACK_ISSUE_TEMPLATE="" \
#    GRANT_PROGRAM_LINK="" \
#    WORKING_GROUP="" \
#    MEMBERSHIP=""
#
#WORKDIR /home/source
#
#RUN set -x && \
#    apk add --update $RUNTIME_DEPS && \
#    apk add --no-cache --virtual build_deps $BUILD_DEPS
#
#RUN echo "I am running on $BUILDPLATFORM, building for $TARGETPLATFORM" > /log
#
##RUN echo "\n\n\nENV CONFIG = $CONFIG" . \
##    "MEMBERSHIP=$MEMBERSHIP" . \
##    "DISRUPTIVE=$DISRUPTIVE" .\
##    "WEB3=$WEB3" .\
##    "INTERHACK=$INTERHACK" .\
##    "DISRUPTIVE_ISSUE_TEMPLATE=$DISRUPTIVE_ISSUE_TEMPLATE" .\
##    "WEB3_ISSUE_TEMPLATE=$WEB3_ISSUE_TEMPLATE" .\
##    "INTERHACK_ISSUE_TEMPLATE=$WEB3_ISSUE_TEMPLATE" .\
##    "GRANT_PROGRAM_LINK=$WEB3_ISSUE_TEMPLATE" .\
##    "WORKING_GROUP=$WORKING_GROUP" > /log
#
#RUN cat /log

#COPY . .
#
#RUN yarn install --production=false && \
#    yarn envsub && \
#    yarn build
#
## -----------
## Production image
#
#FROM node:14-alpine
#
#ENV NODE_ENV="production" \
#    PORT="3000" \
#    USER="app" \
#    FRONTEND_INSTANCES="1" \
#    FRONTEND_MEMORY="256M" \
#    LABEL="Untld frontend"
#
#WORKDIR /home/$USER
#
#RUN npm install pm2 -g && \
#    addgroup -g 2000 app && \
#    adduser -u 2000 -G app -s /bin/sh -D app
#
#USER $USER
#
#COPY --from=source /log /log
#
#RUN echo "\n\n\nENV CONFIG ON SECOND IMAGE = $CONFIG" . \
#    "MEMBERSHIP=$MEMBERSHIP" . \
#    "DISRUPTIVE=$DISRUPTIVE" .\
#    "WEB3=$WEB3" .\
#    "INTERHACK=$INTERHACK" .\
#    "DISRUPTIVE_ISSUE_TEMPLATE=$DISRUPTIVE_ISSUE_TEMPLATE" .\
#    "WEB3_ISSUE_TEMPLATE=$WEB3_ISSUE_TEMPLATE" .\
#    "INTERHACK_ISSUE_TEMPLATE=$WEB3_ISSUE_TEMPLATE" .\
#    "GRANT_PROGRAM_LINK=$WEB3_ISSUE_TEMPLATE" .\
#    "WORKING_GROUP=$WORKING_GROUP" > /log
#
#COPY --chown=$USER:$USER --from=source ["/home/source/dist/", "/home/source/pm2.config.js", "/home/$USER/dist/"]
#
#RUN cat /log
#
#CMD ["pm2-runtime", "start", "./dist/pm2.config.js"]

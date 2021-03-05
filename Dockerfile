FROM node:14-alpine as source

LABEL authors="Albert Iblyaminov <rieset@yandex.ru>" \
      org.label-schema.vendor="Waves Association DAO" \
      org.label-schema.name="Waves Association DAO Image" \
      org.label-schema.description="Waves Association DAO" \
      org.label-schema.url="https://dao.wavesassociation.org" \
      org.label-schema.schema-version="1.0"

ENV BUILD_DEPS="" \
    RUNTIME_DEPS="" \
    NODE_ENV="production" \
    CONFIG="stage" \
    NODE_OPTIONS="--max_old_space_size=5120"

WORKDIR /home/source

RUN set -x && \
    apk add --update $RUNTIME_DEPS && \
    apk add --no-cache --virtual build_deps $BUILD_DEPS

RUN echo "ENV CONFIG = $CONFIG"

COPY . .

RUN yarn add global @angular/cli
RUN npm link @angular/cli


RUN yarn install
RUN yarn add @angular-devkit/build-angular
RUN yarn envsub
#RUN npm update
#RUN yarn upgrade

RUN export PATH="$HOME/.npm-global/bin:$PATH"
RUN yarn build

# -----------
# Production image

FROM node:14-alpine

ENV NODE_ENV="production" \
    PORT="3000" \
    USER="app" \
    FRONTEND_INSTANCES="1" \
    FRONTEND_MEMORY="512M" \
    LABEL="Untld frontend"

WORKDIR /home/$USER

RUN npm install pm2 -g && \
    addgroup -g 2000 app && \
    adduser -u 2000 -G app -s /bin/sh -D app

USER $USER

COPY --chown=$USER:$USER --from=source ["/home/source/dist/", "/home/source/pm2.config.js", "/home/$USER/dist/"]

CMD ["pm2-runtime", "start", "./dist/pm2.config.js"]

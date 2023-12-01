FROM alpine:3.18.5 as cli

WORKDIR /tmp

ARG NODEJS_VERSION="18.10.0"
ARG GOSU_VERSION="1.14"

RUN apk --no-cache add curl \
    && ARCHITECTURE=$(arch | sed s/aarch64/arm64/ | sed s/arm64/arm64/ | sed s/x86_64/x64/ | sed s/i386/x64/) \
    && curl -LO https://nodejs.org/dist/v${NODEJS_VERSION}/node-v${NODEJS_VERSION}-linux-${ARCHITECTURE}.tar.xz \
    && tar xvf node-v${NODEJS_VERSION}-linux-${ARCHITECTURE}.tar.xz \
    && mv node-v${NODEJS_VERSION}-linux-${ARCHITECTURE} node \
    && ARCHITECTURE=$(arch | sed s/aarch64/arm64/ | sed s/arm64/arm64/ | sed s/x86_64/amd64/ | sed s/i386/amd64/) \
    && curl -LO https://github.com/tianon/gosu/releases/download/${GOSU_VERSION}/gosu-${ARCHITECTURE} \
    && chmod +x gosu-${ARCHITECTURE} \
    && mv gosu-${ARCHITECTURE} gosu

FROM ubuntu:22.04

ARG USER_UID_IN_CONTAINER="1000"
ARG USER_NAME_IN_CONTAINER="toro"

COPY --from=cli /tmp/node /opt/node
COPY --from=cli /tmp/gosu /opt/cli/gosu

ENV PATH /opt/node/bin:/opt/cli:$PATH
ENV DEBIAN_FRONTEND noninteractive
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL=ja_JP.UTF-8

RUN apt-get update \
    && apt-get install -y --no-install-recommends -qq sudo \
    && ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
    && apt-get install -y --no-install-recommends -qq tzdata locales git-lfs \
    && apt-get install -y --no-install-recommends -qq build-essential libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && useradd -m -u ${USER_UID_IN_CONTAINER} -G sudo,root ${USER_NAME_IN_CONTAINER} \
    && echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers \
    && mkdir /home/${USER_NAME_IN_CONTAINER}/myapp \
    && chown ${USER_NAME_IN_CONTAINER}:${USER_NAME_IN_CONTAINER} /home/${USER_NAME_IN_CONTAINER}/myapp \
    && locale-gen ja_JP.UTF-8 \
    && localedef -f UTF-8 -i ja_JP ja_JP.utf8 \
    && npm install -g yarn

USER ${USER_NAME_IN_CONTAINER}
WORKDIR /home/${USER_NAME_IN_CONTAINER}/myapp
COPY --chown=${USER_NAME_IN_CONTAINER} . /home/${USER_NAME_IN_CONTAINER}/myapp

RUN mkdir -p /home/${USER_NAME_IN_CONTAINER}/node_modules \
    && yarn install

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

CMD ["/bin/bash"]

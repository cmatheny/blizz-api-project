FROM alpine:3.5
RUN mkdir /simc-repo /simc
RUN apk update && \
    apk add \
        ca-certificates \
        curl \
        g++ \
        libssl1.0 \
        libstdc++ \
        make \
        openssl-dev \
        && \
    curl -L https://api.github.com/repos/simulationcraft/simc/tarball | \
        tar xzpv -C /simc-repo --strip 1 && \
    make -C /simc-repo/engine OPENSSL=1 optimized && \
    mv /simc-repo/engine/simc /simc && \
    rm -rf /simc-repo && \
    apk del \
        ca-certificates \
        curl \
        g++ \
        make \
        openssl-dev \
        && \
    rm -rf /var/cache/apk/*

ENV PATH /simc:$PATH
RUN mkdir -p /simc/results /simc/profiles
ENTRYPOINT [ "/bin/sh" ]

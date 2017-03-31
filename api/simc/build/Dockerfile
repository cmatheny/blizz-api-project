FROM ubuntu:16.04
RUN apt-get update && apt-get install -y git && \
    apt-get install -y --no-install-recommends make \
        build-essential \
        libssl-dev && \
    rm -rf /var/lib/apt/lists/*
COPY ./simc-build /usr/local/bin
CMD [ "/usr/local/bin/simc-build" ]

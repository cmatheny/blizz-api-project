FROM alpine:3.5

RUN apk add --no-cache python3
RUN pip3 install -U pip
RUN pip3 install -U \
    eve \
    setuptools

EXPOSE 5000

RUN mkdir /app
COPY scripts /app

ENTRYPOINT [ "python3", "/app/run.py" ]

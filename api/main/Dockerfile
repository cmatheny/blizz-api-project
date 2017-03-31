FROM ubuntu:16.04
RUN apt-get update && \
    apt-get install -y --no-install-recommends python-pip && \
    pip install --upgrade pip && \
    pip install -U setuptools && \
    pip install eve && \
    apt-get remove -y python-pip && \
    rm -rf /var/lib/apt/lists/*

COPY scripts /python
EXPOSE 5000
CMD python /python/run.py
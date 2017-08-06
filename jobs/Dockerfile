FROM node:8.2.1
MAINTAINER Trevor Ewen <me@trevorewen.com>

RUN DEBIAN_FRONTEND=noninteractive apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y vim && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y less && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y cron

RUN mkdir -p /opt/app
COPY . /opt/app
COPY ./tmp/deployment/package.json package.json
RUN ln -s /usr/local/bin/node /usr/bin/node
ADD deployment/etc/cron.d/jobs-template /etc/cron.d/jobs
RUN chmod 644 /etc/cron.d/jobs && \
    crontab /etc/cron.d/jobs && \
    touch /var/log/cron.log
WORKDIR /opt/app

CMD ["npm", "run", "jobs"]

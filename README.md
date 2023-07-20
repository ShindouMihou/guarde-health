# Guarde

Guarde is a TCP and UDP reverse proxy written in Golang. It was created in an attempt to mitigate the potential of a DNS amplification attack by limiting the IPs to those that has specific WHOIS properties, this was created more towards protecting my local AdGuard Home instance.

## What is Guarde Health

Guarde Health is a side-service to Guarde which enables you to view the metrics that are saved in memory of the Guarde. 
It enables you to know when Guarde or the service backed behind Guarde is acting up.

## Demo

![Guarde Health](https://media.discordapp.net/attachments/802880444877766697/1131556420999979088/image.png?width=759&height=413)

## Installation

As browsers do not support creating TCP connections, which is what Guarde's health check service uses, we have to rely on 
server-side routes to proxy us to the TCP routes. As such, we recommend deploying this service as either a serverless web application 
via [Vercel](vercel.com), [Cloudflare](pages.cloudflare.com) or as a Node application.

You can set this up via Docker using:
```shell
docker build -t guarde-health .
docker run --name guarde-health -p 3000:3000 guarde-health
```
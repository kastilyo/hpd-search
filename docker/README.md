# Docker
This repo contains a docker-compose setup for local development purposes. As of this writing, it only provides services to work with a locally running app. That is, the application(s) defined in this repo are not containerized.

## Getting Started
### Prerequisites
* docker
* docker-compose
### Initialize service environment variables
Copy .env.dist to .env, changing things as desired
### Create Docker Network
`docker network create hpd`
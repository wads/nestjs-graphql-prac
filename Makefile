DOCKER = /usr/local/bin/docker
DOCKER_COMPOSE = ${DOCKER} compose

up:
	${DOCKER_COMPOSE} up
up-daemon:
	${DOCKER_COMPOSE} up -d
down:
	${DOCKER_COMPOSE} down
build:
	${DOCKER_COMPOSE} build

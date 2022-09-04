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
migration-generate:
	${DOCKER_COMPOSE} exec edu-backend npm run typeorm migration:generate -- -d ./src/config/db.config.ts ./src/migrations/${migration_name}
migration-run:
	${DOCKER_COMPOSE} exec edu-backend npm run typeorm migration:run -- -d ./src/config/db.config.ts

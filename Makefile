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
	${DOCKER_COMPOSE} exec edu-backend npm run typeorm migration:generate -- -d ./src/config/db.config.ts ./src/migrations/${NAME}
migration-run:
	${DOCKER_COMPOSE} exec edu-backend npm run typeorm migration:run -- -d ./src/config/db.config.ts
migration-revert:
	${DOCKER_COMPOSE} exec edu-backend npm run typeorm migration:revert -- -d ./src/config/db.config.ts
nest-g-resource:
	${DOCKER_COMPOSE} exec edu-backend npx nest g res ${NAME}
nest-g-module:
	${DOCKER_COMPOSE} exec edu-backend npx nest g mo ${NAME}
nest-g-resolver:
	${DOCKER_COMPOSE} exec edu-backend npx nest g r ${NAME}
nest-g-service:
	${DOCKER_COMPOSE} exec edu-backend npx nest g s ${NAME}


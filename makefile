DOCKER_COMPOSE_FILE=docker-compose.yml

PRISMA_GENERATE=npx prisma generate
PRISMA_MIGRATE=npx prisma migrate dev --name init

DOCKER_COMPOSE_UP=docker-compose -f $(DOCKER_COMPOSE_FILE) up -d
DOCKER_COMPOSE_DOWN=docker-compose -f $(DOCKER_COMPOSE_FILE) down

start: 
	@echo "Starting Docker containers..."
	$(DOCKER_COMPOSE_UP)
	@echo "Docker containers started."

# stop:
# 	@echo "Stopping Docker containers..."
# 	$(DOCKER_COMPOSE_DOWN)
# 	@echo "Docker containers stopped."

prisma:
	@echo "Generating Prisma client and applying migrations..."
	$(PRISMA_GENERATE)
	$(PRISMA_MIGRATE)
	@echo "Prisma client generated and migrations applied."

deploy: start prisma stop

migrate:
	$(PRISMA_MIGRATE)
	$(PRISMA_GENERATE)


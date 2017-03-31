run: build
	docker-compose up -d api
	
run-i: build
	docker-compose up api

build:
	docker-compose stop -t 0 api
	docker-compose build api
    
build-a:
	docker-compose stop -t 0
	docker-compose build

logs:
	docker-compose logs -f api
	
logs-db:
	docker-compose logs -f db

logs-all:
	docker-compose logs -f

down:
	docker-compose down

reset-db: down
    docker volume rm blizzapiproject_mongodata

uninstall: down
	reset-db
    docker volume rm blizzapiproject_simc-repo
    docker volume rm blizzapiproject_simc-build


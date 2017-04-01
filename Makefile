run: build
	docker-compose up -d api
	
run-i: build
	docker-compose up api

run-simc:
	docker-compose stop -t 0 simc-api
	docker-compose build simc-api
	docker-compose up simc-api

build:
	docker-compose stop -t 0 api
	docker-compose build api
    
build-all:
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

uninstall: down
	docker-compose down -v


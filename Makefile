run: run-q
	docker-compose logs -f &

run-q: build
	docker-compose up -d api
	
run-simc: run-simc-q
	docker-compose logs -f &

run-simc-q:
	docker-compose stop simc-api
	docker-compose build simc-api
	docker-compose up -d simc-api

build:
	docker-compose stop api
	docker-compose build api
    
build-all:
	docker-compose stop
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


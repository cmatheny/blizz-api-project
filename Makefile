run: logs-all
	make run-q
	make logs-all

run-q: build-all
	docker-compose up -d api
	
run-simc: run-simc-q
	docker-compose logs -f simc-api &

run-simc-q:
	docker-compose stop simc-api
	docker-compose build simc-api
	docker-compose up -d simc-api

build:
	docker-compose stop api
	docker-compose stop simc-api
	docker-compose build api
	docker-compose build simc-api
    
build-all:
	docker-compose stop
	docker-compose build

logs:
	docker-compose logs -f api
	
logs-db:
	docker-compose logs -f db

logs-all:
	docker-compose logs -f &
    
logs-full:
	docker-compose logs -f -t &

down:
	docker-compose down

uninstall: down
	docker-compose down -v


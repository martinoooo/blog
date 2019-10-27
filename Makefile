usage = "\
Usage: make [target] \n\n\
Available targets:\n\
install           安装依赖\n\
deploy            部署\n\
web               运行client\n\
server            运行server\n"

yyarn = yarn --registry=https://registry.npm.taobao.org  --frozen-lockfile

# Must be the first target!
usage:
	@echo $(usage)

install: 
	yyarn

server:
	yarn start:dev

web:
	cd client && yarn dev

web-build:
	cd client && yarn build
	
deploy: web-build 
	gcloud app deploy
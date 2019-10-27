usage = "\
Usage: make [target] \n\n\
Available targets:\n\
install           安装依赖\n\
deploy            部署\n\
start             运行server\n"

yyarn = yarn --registry=https://registry.npm.taobao.org  --frozen-lockfile

# Must be the first target!
usage:
	@echo $(usage)

install: 
	yyarn

start:
	yarn start:dev

web-build:
	cd client && yarn build
	
deploy:
	gcloud app deploy
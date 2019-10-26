usage = "\
Usage: make [target] \n\n\
Available targets:\n\
install           安装依赖\n\
deploy            部署\n\
start             运行server\n"

yyarn = yarn --registry=http://registry.npm.taobao.com --frozen-lockfile

# Must be the first target!
usage:
	@echo $(usage)

install: 
	yyarn

start:
	yarn start:dev

deploy:
	gcloud app deploy
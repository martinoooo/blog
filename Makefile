usage = "\
Usage: make [target] \n\n\
Available targets:\n\
install           安装依赖\n\
deploy            部署\n\
web               运行client\n\
serve             运行server\n"

# Must be the first target!
usage:
	@echo $(usage)

install: 
	yarn --registry=https://registry.npm.taobao.org  --frozen-lockfile

serve:
	cd server && yarn start:dev

web:
	cd client && yarn dev

web-build:
	cd client && yarn build
	
deploy: web-build 
	gcloud app deploy
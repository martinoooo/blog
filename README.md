# blog

my website

## Description

[Blog](http://www.martinqaq.monster/)

## Installation

```bash
$ make install
```

## Running the app

```bash
# development
由于接口里面使用了GitHub的获取文章的api，里面用到了access_token，是私密的，无法上传，因此若要运行这个代码，需要在server/src里面添加config.ts文件，里面需要导出你自己的ACCESS_TOKEN和GET_CONTENT（获取文章的github地址）才能运行。

$ make web (如果要单独打包某个页面，可以加 page=xxx ---> xxx为client/src/pages下面的文件夹名字)

(等待web构建完成之后)

$ make serve
$ open http://localhost:8080/

# deploy
$ make deploy
```

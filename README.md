# Smartthings - Yale Smart Alarm Integration

## How to Deploy

1/ Create SmartApp in SmartThings Developer Console

2/ Setup an AWS Account

https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/

3/ Clone this repo

4/ Install NPM dependencies
```
npm install
```

5/ Deploy with Serverless framework
```
./node_modules/.bin/sls deploy \
 --param="appId=<YOUR_APP_ID>" \
 --param="clientId=<YOUR_ST_CLIENT_ID>" \
 --param="clientSecret=<YOUR_ST_CLIENT_SECRET>" \
 --param="yaleUsername=<YALE_USERNAME>" \
 --param="yalePassword=<YALE_PASSWORD>"
```

## TODO

* Oauth integration (username and password are used once with access & refresh tokens subsequently used)
* Basic unit tests
* Yale Device polling and management from SmartThings
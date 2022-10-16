Steps

1. Deploy lambda code
serverless deploy

2. Grant Smartthings cloud permission to trigger lambda
https://developer-preview.smartthings.com/docs/connected-services/hosting/aws-lambda/#provide-permission-to-smartthings
aws lambda add-permission --profile personal --function-name smartthings-yale-smart-alarm-dev-yalealarm --statement-id smartthings --principal 906037444270 --action lambda:InvokeFunction

3. Register lambda within Smartthings developer portal

4. Enable Developer Mode in Smartthings App
https://developer-preview.smartthings.com/docs/devices/test-your-device/#enable-developer-mode-in-the-smartthings-app

Config
Description = Integration between Smartthings and Yale SR Series Smart Alarms.
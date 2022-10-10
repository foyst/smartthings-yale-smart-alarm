Steps

1. Deploy lambda code
serverless deploy

2. Grant Smartthings cloud permission to trigger lambda
aws lambda add-permission --profile personal --function-name smartthings-yale-smart-alarm-dev-yalealarm --statement-id smartthings --principal 906037444270 --action lambda:InvokeFunction

3. Register lambda within Smartthings developer portal

4. Enable Developer Mode in Smartthings App
https://developer-preview.smartthings.com/docs/devices/test-your-device/#enable-developer-mode-in-the-smartthings-app

Config
Description = Integration between Smartthings and Yale SR Series Smart Alarms.
SmartApp Client Id = 19b08f4d-800e-43f1-a3d3-173ea2ec5666
SmartApp Client Secret = 0870197e-111e-415a-bffb-266233a5ed8b
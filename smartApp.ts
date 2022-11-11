import { SectionSetting, SmartApp } from '@smartthings/smartapp'
import updatedHandler from './lib/handlers/updated'
import uninstalledHandler from './lib/handlers/uninstalled'
import securityArmStateEventHandler from './lib/handlers/securityModeChange'

const smartApp = new SmartApp()
    .enableEventLogging(2)
    .appId(process.env.APP_ID!)
    .clientId(process.env.CLIENT_ID!)
    .clientSecret(process.env.CLIENT_SECRET!)
    .permissions(['r:security:locations:*:armstate'])
    .disableCustomDisplayName(true)
    .page('mainPage', (_, page) => {

        page.name("Yale SmartThings Integration")
        page.section('Instructions', section => {
            section.paragraphSetting('info').name("Instructions").description("Please enter your Yale credentials below to integrate with SmartThings")
        })

        page.section('yaleCredentials', section => {
            section.name("Yale Credentials")
            section.emailSetting('email').name("Email Address")
            section.passwordSetting('password').name("Password")
        })
    })
    .installed(updatedHandler)
    .subscribedSecurityArmStateEventHandler('securityModeChangeHandler', securityArmStateEventHandler)
    .uninstalled(uninstalledHandler)

export default smartApp
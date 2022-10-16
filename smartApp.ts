import { SmartApp } from '@smartthings/smartapp'
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

        page.section('Text', section => {

            section
                .paragraphSetting('info').text("This is some test text, OH YEAH!")
        })
    })
    .installed(updatedHandler)
    .subscribedSecurityArmStateEventHandler('securityModeChangeHandler', securityArmStateEventHandler)
    .uninstalled(uninstalledHandler)

export default smartApp
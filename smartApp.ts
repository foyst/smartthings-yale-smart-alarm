import { SmartApp } from '@smartthings/smartapp'

const smartApp = new SmartApp()
    .enableEventLogging(2)
    .appId('7c8d8533-aec1-4338-8822-f19d923fee6f')
    .permissions(['r:devices:*'])
    .page('mainPage', (_, page) => {

        page.section('Text', section => {

            section
                .paragraphSetting('info').text("This is some test text, YES IT WORKS! BOOM!")
        })
    })
    .installed(async context => {
        console.log("Hello installed!")
    })

export default smartApp
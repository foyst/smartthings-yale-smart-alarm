import { SmartAppContext } from "@smartthings/smartapp"
import yaleClient from "../yaleClient"

export default function (context: SmartAppContext, updateData: any) {
    
    console.log("Yale SR SmartApp being installed")
    const yaleEmail = context.configStringValue('email')
    const yalePassword = context.configStringValue('password')
    yaleClient.loginWithUsernameAndPassword(yaleEmail, yalePassword)
    const installedAppId = context.api.config.installedAppId

    context.api.subscriptions.subscribeToSecuritySystem('securityModeChangeHandler')
}
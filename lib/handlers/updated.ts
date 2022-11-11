import { SmartAppContext } from "@smartthings/smartapp"
import { createYaleClient } from "../yaleClient"

export default function (context: SmartAppContext, updateData: any) {
    
    console.log("Yale SR SmartApp being installed")
    const yaleEmail = context.configStringValue('email')
    const yalePassword = context.configStringValue('password')

    const yaleClient = createYaleClient(context);
    yaleClient.loginWithUsernameAndPassword(yaleEmail, yalePassword)

    context.api.subscriptions.subscribeToSecuritySystem('securityModeChangeHandler')
}
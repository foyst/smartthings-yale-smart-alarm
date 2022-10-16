import { SmartAppContext } from "@smartthings/smartapp"

export default function (context: SmartAppContext, updateData: any) {
    
    console.log("Yale SR SmartApp being installed")
    context.api.subscriptions.subscribeToSecuritySystem('securityModeChangeHandler')
}
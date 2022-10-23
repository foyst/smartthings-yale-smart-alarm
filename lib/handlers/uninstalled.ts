import { SmartAppContext } from "@smartthings/smartapp"
import { createYaleClient } from "../yaleClient"

export default function (context: SmartAppContext, updateData: any) {
    
    console.log("Yale SR SmartApp being uninstalled")
    context.api.subscriptions.delete('securityModeChangeHandler')
    createYaleClient(context).uninstall()
}
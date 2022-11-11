import { SmartAppContext } from "@smartthings/smartapp"
import { AppEvent } from "@smartthings/smartapp/lib/lifecycle-events"
import { createYaleClient } from "../yaleClient"

export default async function (context: SmartAppContext,
    eventData: AppEvent.SecurityArmStateEvent,
    eventTime?: string): Promise<any> {
    
    const alarmState = eventData.armState
    console.log("Home Monitor state is now " + alarmState)

    const yaleClient = createYaleClient(context)

    switch (alarmState) {
        case "ARMED_AWAY": {
            console.log("Arming Yale (Fully Arm)")
            const armResponse = await yaleClient.setAlarmState("arm")
            break;
        }
        case "ARMED_STAY": {
            console.log("Arming Yale (Part Arm)")
            const armResponse = yaleClient.setAlarmState("home")
            break;
        }
        case "DISARMED": {
            console.log("Disarming Yale")
            const armResponse = yaleClient.setAlarmState("disarm")
            break;
        }
        default: {
            const errorMessage = `Unknown alarm state received: ${alarmState}`
            console.error(errorMessage)
            throw new Error(`Unknown alarm state received: ${alarmState}`)
        }
    }    
}
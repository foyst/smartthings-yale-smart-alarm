import { SmartAppContext } from "@smartthings/smartapp"
import { AppEvent } from "@smartthings/smartapp/lib/lifecycle-events"
import { Tokens } from "../../constants"
import yaleClient from "../yaleClient"

export default async function (context: SmartAppContext,
    eventData: AppEvent.SecurityArmStateEvent,
    eventTime?: string): Promise<any> {
    
    const alarmState = eventData.armState
    console.log("Home Monitor state is now " + alarmState)

    switch (alarmState) {
        case "ARMED_AWAY": {
            console.log("Arming Yale (Fully Arm)")
            const armResponse = await armYaleAway()
            break;
        }
        case "ARMED_STAY": {
            console.log("Arming Yale (Part Arm)")
            const armResponse = await armYaleStay()
            break;
        }
        case "DISARMED": {
            console.log("Disarming Yale")
            const armResponse = await disarmYale()
            break;
        }
    }    
}

function armYaleAway() {
    return yaleClient.setAlarmState("arm");
}

function armYaleStay() {
    return yaleClient.setAlarmState("home");
}

function disarmYale() {
    return yaleClient.setAlarmState("disarm");
}


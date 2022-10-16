import { SmartAppContext } from "@smartthings/smartapp"
import { AppEvent } from "@smartthings/smartapp/lib/lifecycle-events"
import axios from "axios"
import { URLSearchParams } from "url"
import { AppSettings } from "../../constants"

const yaleClient = axios.create({
    baseURL: "https://mob.yalehomesystem.co.uk/yapi"
})

export default async function (context: SmartAppContext,
    eventData: AppEvent.SecurityArmStateEvent,
    eventTime?: string): Promise<any> {
    
    const alarmState = eventData.armState
    console.log("Home Monitor state is now " + alarmState)
    const accessToken = (await getYaleToken()).data.access_token

    switch (alarmState) {
        case "ARMED_AWAY": {
            console.log("Arming Yale (Fully Arm)")
            const armResponse = await armYaleAway(accessToken)
            break;
        }
        case "ARMED_STAY": {
            console.log("Arming Yale (Part Arm)")
            const armResponse = await armYaleStay(accessToken)
            break;
        }
        case "DISARMED": {
            console.log("Disarming Yale")
            const armResponse = await disarmYale(accessToken)
            break;
        }
    }    
}

function getYaleToken() {
    return yaleClient.post('/o/token/', {
        grant_type: "password",
        username: process.env.YALE_USERNAME,
        password: process.env.YALE_PASSWORD,
    }, {
        headers: {
            "Authorization": `Basic ${AppSettings.yaleAuthToken}`,
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        responseType: "json"
    })
}

function armYaleAway(accessToken: string) {
    return changeYaleState(accessToken, "arm")
}

function changeYaleState(accessToken: string, alarmState: string) {
    const data = new URLSearchParams({
        area: "1",
        mode: alarmState
    }).toString()
    return yaleClient.post("api/panel/mode/", data, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": 'application/x-www-form-urlencoded'
        }
    })
}

function armYaleStay(accessToken: string) {
    return changeYaleState(accessToken, "home")
}

function disarmYale(accessToken: string) {
    return changeYaleState(accessToken, "disarm")
}


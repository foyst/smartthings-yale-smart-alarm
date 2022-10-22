import axios, { AxiosError } from "axios";
import { AppSettings, Tokens } from "../constants";
import yaleTokenStore from "./yaleTokenStore";

const yaleClient = axios.create({
    baseURL: "https://mob.yalehomesystem.co.uk/yapi"
})

export default {

    async loginWithUsernameAndPassword(installedAppId: string, username: string, password: string): Promise<Tokens> {
        const response = await yaleClient.post('/o/token/', {
            grant_type: "password",
            username: username,
            password: password,
        }, {
            headers: {
                "Authorization": `Basic ${AppSettings.yaleAuthToken}`,
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            responseType: "json"
        })

        const newTokens: Tokens = {accessToken: response.data.access_token, refreshToken: response.data.refresh_token}

        yaleTokenStore.put(installedAppId, newTokens)

        return newTokens
    },

    async refreshAccessToken(tokens: Tokens): Promise<Tokens> {
        const response = await yaleClient.post('/o/token/', {
            grant_type: "refresh_token",
            refresh_token: tokens.refreshToken
        }, {
            headers: {
                "Authorization": `Basic ${AppSettings.yaleAuthToken}`,
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            responseType: "json"
        })

        const newTokens: Tokens = {accessToken: response.data.access_token, refreshToken: response.data.refresh_token}

        yaleTokenStore.put("blah", newTokens)

        return newTokens
    },

    async setAlarmState(alarmState: string) {

        const tokens = await yaleTokenStore.get("blah");
        this.setAlarmStateWithTokens(alarmState, tokens)
    },
    
    async setAlarmStateWithTokens(alarmState: string, tokens: Tokens) {
        const data = new URLSearchParams({
            area: "1",
            mode: alarmState
        }).toString()
        try {
            return await yaleClient.post("api/panel/mode/", data, {
                headers: {
                    "Authorization": `Bearer ${tokens.accessToken}`,
                    "Content-Type": 'application/x-www-form-urlencoded'
                }
            })
        } catch (error) {
            if (axios.isAxiosError(error) && isUnathenticated(error)) {
                const newTokens = await this.refreshAccessToken(tokens)
                this.setAlarmStateWithTokens(alarmState, newTokens)
                return
            }
            else throw error;
        }
    }
}

function isUnathenticated(error: AxiosError<any, any>) {
    return (error as AxiosError).response?.status === 401
}

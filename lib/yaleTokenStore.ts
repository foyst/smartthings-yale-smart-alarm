import { DynamoDBClient, GetItemCommand, GetItemCommandInput, PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { Tokens } from "../constants";

const client = new DynamoDBClient({});

export default {

    async get(installedAppId: String): Promise<Tokens> {

    const params: GetItemCommandInput = {
        TableName: "SmartThingsYaleTokens",
        Key: marshall(installedAppId),
        };

        const results = await client.send(new GetItemCommand(params));
        const tokens = unmarshall(results.Item || {})
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.accessToken
        }
    },
    
    async put(installedAppId: String, tokens: Tokens) {
    
        const params: PutItemCommandInput = {
            TableName: "SmartThingsYaleTokens",
            Item: marshall({
                "installedAppId": installedAppId,
                "accessToken": tokens.accessToken,
                "refreshToken": tokens.refreshToken
            })
        };
        await client.send(new PutItemCommand(params));
    }
}

import { DeleteItemCommand, DeleteItemCommandInput, DynamoDBClient, GetItemCommand, GetItemCommandInput, PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { Tokens } from "../constants";

const client = new DynamoDBClient({});

export default {

    async get(installedAppId: string): Promise<Tokens> {

        const params: GetItemCommandInput = {
            TableName: "SmartThingsYaleTokens",
            Key: marshall({ installedAppId: installedAppId }),
        };

        const getItemCommand = new GetItemCommand(params);
        const results = await client.send(getItemCommand);
        const tokens = unmarshall(results.Item || {})
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.accessToken
        }
    },

    async put(installedAppId: string, tokens: Tokens) {

        const params: PutItemCommandInput = {
            TableName: "SmartThingsYaleTokens",
            Item: marshall({
                "installedAppId": installedAppId,
                "accessToken": tokens.accessToken,
                "refreshToken": tokens.refreshToken
            })
        };
        await client.send(new PutItemCommand(params));
    },

    async delete(installedAppId: string) {

        const params: DeleteItemCommandInput = {
            TableName: "SmartThingsYaleTokens",
            Key: marshall({ installedAppId: installedAppId }),
        };
        await client.send(new DeleteItemCommand(params))
    }
}

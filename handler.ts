import smartApp from './smartApp'

export function handle(event, context, callback) {
    smartApp.handleLambdaCallback(event, context, callback)
}
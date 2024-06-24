import * as vscode from "vscode";
import * as cp from 'child_process';
import * as rpc from 'vscode-jsonrpc/node';

let exePath = "C:\\Users\\yuqzho\\projects\\Microsoft.Plugins.Manifest\\TestApplication\\bin\\Release\\net8.0\\publish\\TestApplication.exe";
export async function connectToServer() {
    let childProcess = cp.spawn(exePath);

    // Use stdin and stdout for communication:
    let connection = rpc.createMessageConnection(
        new rpc.StreamMessageReader(childProcess.stdout),
        new rpc.StreamMessageWriter(childProcess.stdin));

    connection.listen();

    let notification = new rpc.NotificationType<string>('testNotification');
    connection.sendNotification(notification, 'Hello World');
}
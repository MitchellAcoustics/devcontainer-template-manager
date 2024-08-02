import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

/**
 * This function is called when the extension is activated.
 * It sets up the commands for deploying and saving DevContainer templates.
 * @param context - The context of the VS Code extension
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('DevContainer Template Manager is now active!');

    // Register the command to deploy a DevContainer template
    let deployDisposable = vscode.commands.registerCommand('extension.deployDevcontainer', deployDevcontainer(context));
    context.subscriptions.push(deployDisposable);

    // Register the command to save the current DevContainer as a template
    let saveDisposable = vscode.commands.registerCommand('extension.saveDevcontainerTemplate', saveDevcontainerTemplate(context));
    context.subscriptions.push(saveDisposable);
}

/**
 * Function to deploy a DevContainer template to the current workspace.
 * It allows users to select from available templates and copies the selected template to the workspace.
 * @param context - The context of the VS Code extension
 */
function deployDevcontainer(context: vscode.ExtensionContext) {
    return async () => {
        try {
            const templatesPath = path.join(context.extensionPath, 'templates');
            const templates = await fs.promises.readdir(templatesPath);
            
            const selectedTemplate = await vscode.window.showQuickPick(templates, {
                placeHolder: 'Select a DevContainer template'
            });
            
            if (selectedTemplate) {
                const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
                
                if (workspaceFolder) {
                    const devcontainerPath = path.join(workspaceFolder.uri.fsPath, '.devcontainer');
                    await fs.promises.mkdir(devcontainerPath, { recursive: true });
                    await copyDir(path.join(templatesPath, selectedTemplate), devcontainerPath);
                    vscode.window.showInformationMessage('DevContainer configuration deployed successfully!');
                } else {
                    throw new Error('No workspace folder found. Please open a folder first.');
                }
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Error deploying DevContainer: ${error instanceof Error ? error.message : String(error)}`);
        }
    };
}

/**
 * Function to save the current DevContainer configuration as a new template.
 * It prompts the user for a template name and saves the current .devcontainer folder as a new template.
 * @param context - The context of the VS Code extension
 */
function saveDevcontainerTemplate(context: vscode.ExtensionContext) {
    return async () => {
        try {
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            
            if (workspaceFolder) {
                const devcontainerPath = path.join(workspaceFolder.uri.fsPath, '.devcontainer');
                
                if (await fs.promises.access(devcontainerPath).then(() => true).catch(() => false)) {
                    const templateName = await vscode.window.showInputBox({
                        prompt: 'Enter a name for your template',
                        placeHolder: 'my-template'
                    });
                    
                    if (templateName) {
                        const templatesPath = path.join(context.extensionPath, 'templates', templateName);
                        await fs.promises.mkdir(templatesPath, { recursive: true });
                        await copyDir(devcontainerPath, templatesPath);
                        vscode.window.showInformationMessage(`Template "${templateName}" saved successfully!`);
                    }
                } else {
                    throw new Error('No .devcontainer folder found in the current workspace.');
                }
            } else {
                throw new Error('No workspace folder found. Please open a folder first.');
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Error saving DevContainer template: ${error instanceof Error ? error.message : String(error)}`);
        }
    };
}

/**
 * Helper function to recursively copy a directory.
 * @param src - Source directory path
 * @param dest - Destination directory path
 */
async function copyDir(src: string, dest: string) {
    await fs.promises.mkdir(dest, { recursive: true });
    let entries = await fs.promises.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await fs.promises.copyFile(srcPath, destPath);
        }
    }
}

/**
 * This function is called when the extension is deactivated.
 * Currently, no cleanup is necessary.
 */
export function deactivate() {}
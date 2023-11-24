// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { fileTypeList } from "./constant/constant";
import { FileType } from "./constant/type";
import template from "./template/template";
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "createFile.menusCreateFile",
      async (event) => {
        try {
          // get folder path
          const path = event.path;

          // select file type
          const fileType: FileType | undefined | string  = await vscode.window.showQuickPick(fileTypeList, {
            placeHolder: "Select file type",
          });

          // input file name when fileType is selected
          let fileName: string | undefined;
          if (fileType) {
            fileName = await vscode.window.showInputBox({
              placeHolder: "Input file name",
            });
          } else {
            return;
          }

          // create file when fileName is input
          if (fileName && fileType) {
            // create file
            let filePath = `${path}/${fileName}.${fileType}`;
            await vscode.workspace.fs.writeFile(
              vscode.Uri.file(filePath),
              // read file content from template
              Buffer.from(template[fileType as FileType])
            );
            // show file in editor
            const document = await vscode.workspace.openTextDocument(
              vscode.Uri.file(filePath)
            );
            await vscode.window.showTextDocument(document);
          }
        } catch (err) {
          if (err instanceof Error) {
            vscode.window.showErrorMessage(err.message);
          }
        }
      }
    )
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}

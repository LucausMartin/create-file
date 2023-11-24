import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { exec } from "child_process";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "createFile.menusCreateFile",
      async (event) => {
        try {
          // 输入文件名
          const fileName = await vscode.window.showInputBox({
            placeHolder: "请输入文件名",
          });
          // 操作文件夹的路径
          const actionPath = event.path;
          // 根路径
          const rootPath = vscode.workspace.workspaceFolders![0].uri.path;
          // 读取 rootPath.aoviz-tmp 文件夹下的所有文件夹
          const tmpPath = path.resolve(rootPath, '.aoviz-tmp');
          const tmpDirs = fs.readdirSync(tmpPath);
          // 选择文件类型
          const fileType = await vscode.window.showQuickPick(tmpDirs, {
            placeHolder: "请选择文件类型",
          });
          // 读取文件类型下 metadate 文件夹下的所有文件名
          const metadataPath = path.resolve(tmpPath, fileType!, 'metadata');
          const files = fs.readdirSync(metadataPath);
          // 去掉 .json 后缀
          const metaDates = files.map((file) => file.split('.')[0]);
          const metaDate = await vscode.window.showQuickPick(metaDates, {
            placeHolder: "请选择文件元数据",
          });
          // 执行指令  aoviz code-gen t -t ${fileType} -m ${fileName} -o ${actionPath}
          exec(`cd ${actionPath} && aoviz code-gen ${fileName} -t ${fileType} -m ${metaDate} -o ${actionPath}`, (err, stdout, stderr) => {
            if (err) {
              throw err;
            }
          }
          );
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

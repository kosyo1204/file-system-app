import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { Directory, CommandManager, CreateFileCommand } from './model';


//メインプログラム
window.addEventListener('DOMContentLoaded', () => {
  const main = new Main(document.body);
});

class Main {
  constructor(private body: HTMLElement) {
    // コンストラクタで初期化処理を行う
    console.log('Main class initialized');

    // DOM 要素を操作する例
    // body.textContent = 'Hello, TypeScript!';

      // Usage Example
    const root = new Directory("root");
    const commandManager = new CommandManager();

    // Create some files and directories
    const docs = new Directory("documents");
    root.add(docs);

    const createFileCmd = new CreateFileCommand(docs, "report.txt", 1024);
    commandManager.execute(createFileCmd);

    // Print the file system
    root.print("");

    // Undo the last operation
    commandManager.undo();

    // Print again to see the change
    root.print("");
  }
}

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { File, Directory, FileSystemRenderer, CommandManager, CreateFileCommand } from './model';


//メインプログラム
window.addEventListener('DOMContentLoaded', () => {
  const main = new Main(document.body);
});

class Main {
  constructor(private body: HTMLElement) {
    const container = document.getElementById('fileSystemContainer');
    const rootDir = new Directory('ルートディレクトリ');
    const documentsDir = new Directory('Documents');
    documentsDir.add(new File('report.txt', 1024));
    documentsDir.add(new File('presentation.pptx', 2048));

    const imagesDir = new Directory('Images');
    imagesDir.add(new File('vacation.jpg', 3072));
    imagesDir.add(new File('profile.png', 512));

    rootDir.add(documentsDir);
    rootDir.add(imagesDir);
    rootDir.add(new File('readme.txt', 256));

    if (container) {
      const renderer = new FileSystemRenderer(container);
      renderer.render(rootDir);
    }
  }
}

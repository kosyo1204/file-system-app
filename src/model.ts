interface FileSystemItem {
  name: string;
  getSize(): number;
  renderElement(): HTMLElement;
}

export class File implements FileSystemItem {
  constructor(
    public name: string,
    private size: number
  ) {}

  getSize(): number {
    return this.size;
  }

  renderElement(): HTMLElement {
    const li = document.createElement('li');
    li.textContent = `${this.name} (${this.size} bytes)`;
    li.classList.add('file-name');
    return li;
  }
}

export class Directory implements FileSystemItem {
  private items: FileSystemItem[] = [];
  public element: HTMLElement;

  constructor(public name: string) {
    this.element = document.createElement('ul');
    this.element.classList.add('directory');
  }

  add(item: FileSystemItem): void {
    this.items.push(item);
  }

  remove(item: FileSystemItem): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  getSize(): number {
    return this.items.reduce((sum, item) => sum + item.getSize(), 0);
  }

  // renderElement(): HTMLElement {
  //   const li = document.createElement('li');
  //   const dirNameSpan = document.createElement('span');
  //   dirNameSpan.textContent = `${this.name} (${this.getSize()} bytes)`;
  //   dirNameSpan.classList.add('directory-name');
  //   li.appendChild(dirNameSpan);
  //   li.appendChild(this.element);
  //   return li;
  // }

  renderElement(): HTMLElement {
    const li = document.createElement('li');
    const dirNameSpan = document.createElement('span');
    dirNameSpan.textContent = `${this.name} (${this.getSize()} bytes)`;
    dirNameSpan.classList.add('directory-name');
    li.appendChild(dirNameSpan);
  
    // Append child elements to `this.element` directly
    this.items.forEach(item => this.element.appendChild(item.renderElement()));
  
    li.appendChild(this.element);
    return li;
  }
}

export class FileSystemRenderer {
  constructor(private container: HTMLElement) {}

  render(rootDirectory: Directory): void {
    const rootElement = rootDirectory.renderElement();
    this.container.appendChild(rootElement);
  }
}

interface Command {
  execute(): void;
  undo(): void;
}

export class CreateFileCommand implements Command {
  private parentDir: Directory;
  private file: File;

  constructor(parentDir: Directory, fileName: string, fileSize: number) {
    this.parentDir = parentDir;
    this.file = new File(fileName, fileSize);
  }

  execute(): void {
    this.parentDir.add(this.file);
  }

  undo(): void {
    this.parentDir.remove(this.file);
  }
}

// class DeleteFileCommand implements Command {
//   private parentDir: Directory;
//   private file: FileSystemItem;

//   constructor(parentDir: Directory, file: FileSystemItem) {
//     this.parentDir = parentDir;
//     this.file = file;
//   }

//   execute(): void {
//     this.parentDir.remove(this.file);
//   }

//   undo(): void {
//     this.parentDir.add(this.file);
//   }
// }

export class CommandManager {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  execute(command: Command): void {
    command.execute();
    this.undoStack.push(command);
    this.redoStack = [];
  }

  undo(): void {
    const command = this.undoStack.pop();
    if (command) {
      command.undo();
      this.redoStack.push(command);
    }
  }

  redo(): void {
    const command = this.redoStack.pop();
    if (command) {
      command.execute();
      this.undoStack.push(command);
    }
  }
}

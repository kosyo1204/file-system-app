interface FileSystemItem {
  name: string;
  getSize(): number;
  print(indent: string): void;
}

class File implements FileSystemItem {
  constructor(
    public name: string,
    private size: number
  ) {}

  getSize(): number {
    return this.size;
  }

  print(indent: string): void {
    console.log(`${indent}📄 ${this.name} (${this.size} bytes)`);
  }
}

class Directory implements FileSystemItem {
  private items: FileSystemItem[] = [];

  constructor(public name: string) {}

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

  print(indent: string): void {
    console.log(`${indent}📁 ${this.name}/`);
    this.items.forEach(item => item.print(indent + "  "));
  }
}

interface Command {
  execute(): void;
  undo(): void;
}

class CreateFileCommand implements Command {
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

class DeleteFileCommand implements Command {
  private parentDir: Directory;
  private file: FileSystemItem;

  constructor(parentDir: Directory, file: FileSystemItem) {
    this.parentDir = parentDir;
    this.file = file;
  }

  execute(): void {
    this.parentDir.remove(this.file);
  }

  undo(): void {
    this.parentDir.add(this.file);
  }
}

class CommandManager {
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

export function main() {
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

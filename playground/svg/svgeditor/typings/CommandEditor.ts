import { Command } from "./Command";
export interface CommandEditor {
  insertCommand(command: Command): void;
  deleteCommand(index: number): void;
  editActiveCommand(): void;
  deleteActiveCommand(): void;
  insertPath(path: string): void;
  getSourcePath(): string[];
}

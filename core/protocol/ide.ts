import type {
  ContinueRcJson,
  FileStatsMap,
  FileType,
  IDE,
  IdeInfo,
  IdeSettings,
  IndexTag,
  Location,
  Problem,
  Range,
  RangeInFile,
  TerminalOptions,
  Thread,
} from "../";
import { ControlPlaneSessionInfo } from "../control-plane/AuthTypes";

export interface GetGhTokenArgs {
  force?: boolean;
}

export type ToIdeFromWebviewOrCoreProtocol = {
  // Methods from IDE type
  getIdeInfo: [undefined, IdeInfo];
  getWorkspaceDirs: [undefined, string[]];
  writeFile: [{ path: string; contents: string }, void];
  showVirtualFile: [{ name: string; content: string }, void];
  openFile: [{ path: string }, void];
  openUrl: [string, void];
  runCommand: [{ command: string; options?: TerminalOptions }, void];
  getSearchResults: [{ query: string; maxResults?: number }, string];
  getFileResults: [{ pattern: string; maxResults?: number }, string[]];
  subprocess: [{ command: string; cwd?: string }, [string, string]];
  saveFile: [{ filepath: string }, void];
  fileExists: [{ filepath: string }, boolean];
  readFile: [{ filepath: string }, string];
  getProblems: [{ filepath: string }, Problem[]];
  getOpenFiles: [undefined, string[]];
  getCurrentFile: [
    undefined,
    (
      | undefined
      | {
          isUntitled: boolean;
          path: string;
          contents: string;
        }
    ),
  ];
  getPinnedFiles: [undefined, string[]];
  showLines: [{ filepath: string; startLine: number; endLine: number }, void];
  readRangeInFile: [{ filepath: string; range: Range }, string];
  getDiff: [{ includeUnstaged: boolean }, string[]];
  getWorkspaceConfigs: [undefined, ContinueRcJson[]];
  getTerminalContents: [undefined, string];
  getDebugLocals: [{ threadIndex: number }, string];
  getTopLevelCallStackSources: [
    { threadIndex: number; stackDepth: number },
    string[],
  ];
  getAvailableThreads: [undefined, Thread[]];
  isTelemetryEnabled: [undefined, boolean];
  isWorkspaceRemote: [undefined, boolean];
  getUniqueId: [undefined, string];
  getTags: [string, IndexTag[]];
  readSecrets: [{ keys: string[] }, Record<string, string>];
  writeSecrets: [{ secrets: Record<string, string> }, void];
  // end methods from IDE type

  getIdeSettings: [undefined, IdeSettings];

  // Git
  getBranch: [{ dir: string }, string];
  getRepoName: [{ dir: string }, string | undefined];

  showToast: [
    Parameters<IDE["showToast"]>,
    Awaited<ReturnType<IDE["showToast"]>>,
  ];
  getGitRootPath: [{ dir: string }, string | undefined];
  listDir: [{ dir: string }, [string, FileType][]];
  getFileStats: [{ files: string[] }, FileStatsMap];

  gotoDefinition: [{ location: Location }, RangeInFile[]];

  getControlPlaneSessionInfo: [
    { silent: boolean; useOnboarding: boolean },
    ControlPlaneSessionInfo | undefined,
  ];
  logoutOfControlPlane: [undefined, void];
  reportError: [any, void];
  closeSidebar: [undefined, void];
};

export type ToWebviewOrCoreFromIdeProtocol = {
  didChangeActiveTextEditor: [{ filepath: string }, void];
};

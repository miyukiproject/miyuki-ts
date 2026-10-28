type ElectronRendererApi = {
  ipcRenderer: {
    invoke: (channel: string, ...args: unknown[]) => Promise<unknown>;
  };
};

const electron =
  typeof window !== "undefined" && typeof window.require === "function"
    ? (window.require("electron") as ElectronRendererApi)
    : null;

export const hasElectronBridge = Boolean(electron);

export const invokeElectron = async <T>(channel: string, ...args: unknown[]) => {
  if (!electron) {
    throw new Error("Electron bridge is not available");
  }

  return electron.ipcRenderer.invoke(channel, ...args) as Promise<T>;
};
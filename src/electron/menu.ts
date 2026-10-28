import { dialog, shell, type MenuItemConstructorOptions } from "electron";

type MenuHandlers = {
    onOpenProgressFile: () => Promise<void>;
    onCreateProgressFile: () => Promise<void>;
};

export const createMenuTemplate = ({ onOpenProgressFile, onCreateProgressFile }: MenuHandlers): MenuItemConstructorOptions[] => [
    {
        label: "Archivo",
        submenu: [
            {
                label: "Seleccionar progreso",
                click: () => {
                    void onOpenProgressFile();
                },
            },
            {
                label: "Nuevo progreso",
                click: () => {
                    void onCreateProgressFile();
                },
            },
        ],
    },
    {
        label: "Ayuda",
        submenu: [
            {
                label: "Sobre Miyuki",
                click: () => {
                    dialog.showMessageBox({
                        type: "info",
                        title: "Sobre Miyuki",
                        message:
                            "Miyuki es un proyecto colaborativo y de código abierto para que puedas instalar una versión minimalista del laboratorio de Mumuki en tu computadora.",
                    });
                },
            },
            {
                label: "Licencia",
                click: () => {
                    shell.openExternal("https://github.com/miyukiproject/miyuki/blob/main/LICENSE");
                },
            },
            {
                label: "Reporte de errores",
                click: () => {
                    shell.openExternal("https://github.com/miyukiproject/miyuki/issues");
                },
            },
            {
                label: "Unite a nuestra comunidad en discord",
                click: () => {
                    shell.openExternal("https://discord.gg/Ak4ee7fcSM");
                },
            },
        ],
    },
];
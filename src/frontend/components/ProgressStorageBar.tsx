import { useEffect, useState } from "react";
import { hasElectronBridge } from "../helpers/electron";
import {
  getProgressInfo,
  onProgressInfoUpdated,
  pickProgressFilePath,
  saveProgressFilePath,
} from "../helpers/progressStorage";

const ProgressStorageBar = () => {
  const [info, setInfo] = useState<{ currentFilePath: string; defaultFilePath: string; isCustom: boolean } | null>(null);
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);
  const [choosing, setChoosing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!hasElectronBridge) {
      return;
    }

    void getProgressInfo().then(setInfo).catch(() => setInfo(null));

    const dispose = onProgressInfoUpdated((nextInfo) => {
      setInfo(nextInfo);
    });

    return () => {
      dispose();
    };
  }, []);

  if (!hasElectronBridge || !info) {
    return null;
  }

  const handleChoose = async () => {
    setChoosing(true);
    try {
      const nextFilePath = await pickProgressFilePath();
      if (nextFilePath) {
        setSelectedFilePath(nextFilePath);
      }
    } finally {
      setChoosing(false);
    }
  };

  const handleSave = async () => {
    if (!selectedFilePath) {
      return;
    }

    setSaving(true);
    try {
      const nextInfo = await saveProgressFilePath(selectedFilePath);
      setInfo(nextInfo);
      setSelectedFilePath(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm">
      <div className="mb-3 flex flex-col gap-1">
        <p className="font-semibold text-gray-800">Archivo de progreso</p>
        <p className="break-all text-gray-600">Actual: {info.currentFilePath}</p>
        <p className="break-all text-gray-500">
          {selectedFilePath ? `Elegido: ${selectedFilePath}` : `Default: ${info.defaultFilePath}`}
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={handleChoose}
          disabled={choosing}
          className="rounded bg-mumuki-skyblue px-3 py-2 font-semibold text-white hover:bg-mumuki-skyblue/90 disabled:opacity-60"
        >
          {choosing ? "Eligiendo..." : "Elegir"}
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={!selectedFilePath || saving}
          className="rounded border border-gray-300 bg-white px-3 py-2 font-semibold text-gray-800 hover:bg-gray-100 disabled:opacity-60"
        >
          {saving ? "Abriendo..." : "Abrir"}
        </button>
      </div>
    </div>
  );
};

export default ProgressStorageBar;
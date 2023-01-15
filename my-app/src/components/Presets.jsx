import React, {useEffect, useState} from 'react';
import {evalScript} from '../AEService/Extend';
import PresetService from '../API/PresetService';


function Presets({projectPath, compId, folderId, selectedPreset, setSelectedPreset}) {
    const emptyPreset = {key: null, importedId: null, layerId: null, markers: []};
    const [presets, setPresets] = useState([]);


    useEffect(() => {
        loadPresets().catch(console.error);
        setSelectedPreset(JSON.parse(localStorage.getItem('Preset')));
    }, []);

    const loadPresets = async () => {
        const res = await PresetService.getAllPresets();
        setPresets(res.data);
    };

    useEffect(() => {
        localStorage.setItem('Preset', JSON.stringify(selectedPreset));
    }, [selectedPreset]);

    const addPresetToComp = () => {
        evalScript(`addItemToComp(${selectedPreset.importedId}, ${compId})`)
            .then(async (layerId) => setSelectedPreset({
                ...selectedPreset,
                layerId: layerId,
                markers: await evalScript(`getLayerMarkers(${layerId})`)
            }));
    };

    const clearSelectedPreset = () => {
        setSelectedPreset({...emptyPreset});
    };

    const downloadPreset = async (preset) => {
        const res = await PresetService.getPresetDownloadLink(preset.id);
        const path = projectPath + '\\\\' + preset.key;
        downloadVideoLame(res.data, path)
            .then(() =>
                evalScript(`importFile('${path}', ${folderId})`)
                    .then((itemId) => {
                        setSelectedPreset({...selectedPreset, importedId: itemId, key: preset.key});
                    }),
            );
    };

    const loadLocalPreset = async () => {
        const layerId = await evalScript(`getSelectedLayerId()`)
        const markers = await evalScript(`getLayerMarkers(${layerId})`)
        setSelectedPreset({...selectedPreset, layerId: layerId, key: "local", markers: markers});
    }


    return (
        <div>
            {
                selectedPreset.importedId || selectedPreset.layerId ?
                    <div className="presets">
                        <div>{selectedPreset.name}</div>
                        <div>{selectedPreset.key}</div>
                        <button onClick={addPresetToComp}>Add to comp</button>
                        <div>Clips number fo preset - {selectedPreset.markers.length}</div>
                        <button onClick={clearSelectedPreset}>Unselect preset</button>
                    </div> :
                    presets.map((preset) =>
                        <div key={preset.id} className="presets">
                            <div>{preset.name}</div>
                            <div>{preset.key}</div>
                            <button onClick={() => downloadPreset(preset)}>Download</button>
                        </div>,
                    )
            }
            <button onClick={loadLocalPreset}>Load local Preset</button>
        </div>
    );
}

export default Presets;

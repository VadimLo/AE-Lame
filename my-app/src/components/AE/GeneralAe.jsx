import Presets from '../Presets';
import TagsBoxSelectable from '../TagsBoxSelectable';
import React, {useEffect, useState} from 'react';
import {evalScript} from '../../AEService/Extend';

function GeneralAe({tags}) {
    const folderKey = 'FolderId';
    const compKey = 'CompId';
    const downloadedIdsKey = 'importedIds';
    const layerIdsKey = 'layerIds';
    const emptyPreset = {key: null, importedId: null, layerId: null, markers: []};


    const [projectPath, setProjectPath] = useState('');
    const [folderId, setFolderId] = useState('');
    const [compId, setCompId] = useState('');
    const [importedIds, setImportedIds] = useState([]);
    const [layerIds, setLayerIds] = useState([]);

    const [selectedPreset, setSelectedPreset] = useState(emptyPreset);


    useEffect(() => {
        evalScript('getProjectLocation()')
            .then((parentPath) => {
                setProjectPath(parentPath.result);
            });
        setFolderId(localStorage.getItem(folderKey));
        setCompId(localStorage.getItem(compKey));
        setLayerIds(JSON.parse(localStorage.getItem(layerIdsKey)));
        setImportedIds(JSON.parse(localStorage.getItem(downloadedIdsKey)));
    }, []);

    useEffect(() => {
        localStorage.setItem('ProjectPath', projectPath);
    }, [projectPath]);

    useEffect(() => {
        localStorage.setItem(folderKey, folderId);
    }, [folderId]);

    useEffect(() => {
        localStorage.setItem(compKey, compId);
    }, [compId]);

    useEffect(() => {
        localStorage.setItem(downloadedIdsKey, JSON.stringify(importedIds));
    }, [importedIds]);

    useEffect(() => {
        localStorage.setItem(layerIdsKey, JSON.stringify(layerIds));
    }, [layerIds]);

    const createProj = () => {
        evalScript('createProj()')
            .then(() => console.log('proj created'));
    };
    const createComp = () => {
        evalScript('createComp()')
            .then((id) => setCompId(id));
    };

    const createFolder = () => {
        evalScript('createFolder()')
            .then((id) => setFolderId(id));
    };

    const addItemsToComp = () => {
        const res = [];
        importedIds.map((it, ind) => {
            res.push({id: it, startTime: selectedPreset.markers[ind]});
        });
        evalScript(`addItemToCompBulk('${JSON.stringify(res)}', ${compId})`)
            .then((ids) => setLayerIds(ids));
    };
    const stretchLayers = () => {
        const res = [];
        layerIds.map((it, ind) => {
            res.push({id: it, endTime: selectedPreset.markers[ind]});
        });
        evalScript(`stretchLayerBulk('${JSON.stringify(res)}')`)
            .then((re) => console.log(re));
    };


    return (projectPath ?
            <div className="Ae">
                <Presets projectPath={projectPath.replace(/\\/g, '\\\\')}
                         folderId={folderId}
                         compId={compId}
                         selectedPreset={selectedPreset}
                         setSelectedPreset={setSelectedPreset}
                />
                <button onClick={createProj}>Create Project</button>
                <button onClick={createComp}>Create Comp</button>
                <button onClick={createFolder}>Create folder</button>
                <button onClick={addItemsToComp}>add items to comp</button>
                <button onClick={stretchLayers}>Stretch to 60 fps</button>
                <TagsBoxSelectable tags={tags}
                                   projectPath={projectPath.replace(/\\/g, '\\\\')}
                                   folderId={folderId}
                                   updateId={setImportedIds}
                />
            </div> :
            <div>Create or open Project, pls_)</div>
    );
}

export default GeneralAe;

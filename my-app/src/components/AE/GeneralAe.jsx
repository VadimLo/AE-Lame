import Presets from '../Presets';
import TagsBoxSelectable from '../TagsBoxSelectable';
import React, {useEffect, useState} from 'react';
import {evalScript} from '../../AEService/Extend';

function GeneralAe({tags}) {
    const folderKey = 'FolderId';
    const compKey = 'CompId';
    const videoKey = 'Videos';
    const emptyPreset = {key: null, importedId: null, layerId: null, markers: []};
    const emptyVideo = {key: null, importedId: null, layerId: null};


    const [projectPath, setProjectPath] = useState('');
    const [folderId, setFolderId] = useState('');
    const [compId, setCompId] = useState('');
    const [videos, setVideos] = useState([]);


    const [selectedPreset, setSelectedPreset] = useState(emptyPreset);


    useEffect(() => {
        evalScript('getProjectLocation()')
            .then((parentPath) => {
                setProjectPath(parentPath.result);
            });
        setFolderId(localStorage.getItem(folderKey));
        setCompId(localStorage.getItem(compKey));
        setVideos(JSON.parse(localStorage.getItem(videoKey)));
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
        localStorage.setItem(videoKey, JSON.stringify(videos));
    }, [videos]);

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
        videos.forEach(async (it, ind) => {
            it.layerId = await evalScript(`addItemToComp(${it.importedId}, ${compId}, ${selectedPreset.markers[ind]})`)
        });
        setVideos([...videos])
    };
    const stretchLayers = () => {
        const res = [];
        videos.map((it, ind) => {
            res.push({id: it.layerId, endTime: selectedPreset.markers[ind]});
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
                         setCompId={setCompId}
                />
                <button onClick={createProj}>Create Project</button>
                <button onClick={createComp}>Create Comp</button>
                <button onClick={createFolder}>Create folder</button>
                <button onClick={addItemsToComp}>add items to comp</button>
                <button onClick={stretchLayers}>Stretch to 60 fps</button>
                <TagsBoxSelectable tags={tags}
                                   projectPath={projectPath.replace(/\\/g, '\\\\')}
                                   folderId={folderId}
                                   updateId={setVideos}
                />
            </div> :
            <div>Create or open Project, pls_)</div>
    );
}

export default GeneralAe;

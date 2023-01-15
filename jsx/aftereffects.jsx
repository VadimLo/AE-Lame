// #include 'json2.js'

function main() {
    alert("hello");
    return "result";
}

function createProj() {
    app.newProject().save(File('C:\\Users\\vadim\\Desktop\\lm\\c'))

}

function createComp() {
    return app.project.items.addComp("LameComp", 1920, 1080, 1, 100, 60).id;

}


function importFile(path, folderId) {
    var importOptions = new ImportOptions();
    importOptions.file = new File(path);
    var item = app.project.importFile(importOptions);

    try {
        item.parentFolder = app.project.itemByID(folderId);
        return item.id;
    } catch (err) {
        alert(err)
    }

}

function createFolder() {
    return app.project.items.addFolder("LameFolder").id;
}

function getProjectLocation() {
    return app.project.file ? JSON.stringify({result: app.project.file.parent.fsName}) : undefined;
}

function addItemToCompBulk(list, compId) {
    var ids = JSON.parse(list);
    var layerIds = []
    for (var k = 0; k < ids.length; k++) {
        layerIds.push(addItemToComp(ids[k].id, compId, ids[k].startTime))
    }
    return JSON.stringify(layerIds);
}

function addItemToComp(itemId, compId, startTime) {
    try {
        var comp = app.project.itemByID(compId)
        var item = app.project.itemByID(itemId);
        var layer = comp.layers.add(item);
        layer.startTime = startTime ? startTime : 0;
        return layer.id;
    } catch (err) {
        alert(err)
    }

}

function getLayerMarkers(layerId) {
    var result = []
    var prop = app.project.layerByID(layerId).property("ADBE Marker")
    for (var i = 1; i <= prop.numKeys; i++) {
        result.push(prop.keyTime(i));
    }
    return JSON.stringify(result)
}

function stretchLayerBulk(list) {
    var ls = JSON.parse(list);
    for (var i = 0; i < ls.length - 1; i++) {
        stretchLayer(ls[i].id, ls[i + 1].endTime)
    }

}

function stretchLayer(layerId, endTime) {
    var fps = 60;
    try {
        var layer = app.project.layerByID(layerId)
        layer.timeRemapEnabled = true;
        var startLen = layer.outPoint - layer.inPoint;
        var newTime = (startLen * layer.source.frameRate) / fps;
        var outPoint = layer.inPoint + newTime;
        layer.outPoint = outPoint < endTime ? outPoint : endTime;
        var posValueCopy = layer.property("ADBE Time Remapping").keyValue(2);
        layer.property("ADBE Time Remapping").removeKey(2);
        layer.property("ADBE Time Remapping").addKey(layer.outPoint);
        layer.property("ADBE Time Remapping").setValueAtKey(2, posValueCopy);
    } catch (e) {
        alert(e)
    }
}

function getSelectedLayerId() {
    var aComp = app.project.activeItem;
    var layer = aComp.selectedLayers[0];
    return layer.id;
}
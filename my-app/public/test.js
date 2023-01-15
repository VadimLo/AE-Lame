const https = require('https');


const fs = require('fs');

window.downloadVideoLame = (url, path) => {
  const file = fs.createWriteStream(path);

  console.log('run get');

  return new Promise((resolve, reject) => {
    https.get(url, function(res) {
      res.pipe(file);
      res.on('error', reject);
      file.on('finish', resolve);
    });
  });
};
//
// let eventNames = [
//     undefined,
//     '',
//     'applicationActivate',
//     'ApplicationActivate',
//     'applicationBeforeQuit',
//     'ApplicationBeforeQuit',
//     'com.adobe.browser.event.ConcatenationCancel',
//     'com.adobe.browser.event.ConcatenationRequest',
//     'com.adobe.browser.event.DeleteDynamicColumns',
//     'com.adobe.browser.event.ExitApp',
//     'com.adobe.browser.event.ExportAsset',
//     'com.adobe.browser.event.GetAssociatedFiles',
//     'com.adobe.browser.event.GetCurrentWorkMode',
//     'com.adobe.browser.event.GetMediaPropertyInfo',
//     'com.adobe.browser.event.InsertDynamicColumns',
//     'com.adobe.browser.event.IsPremiereProInstalled',
//     'com.adobe.browser.event.OpenIngestDialog',
//     'com.adobe.browser.event.ReadXMPFromCache',
//     'com.adobe.browser.event.ReadXMPFromDisk',
//     'com.adobe.browser.event.RenameRequest',
//     'com.adobe.browser.event.SendTagTemplate',
//     'com.adobe.browser.event.TranscodeCancel',
//     'com.adobe.browser.event.TranscodeRequest',
//     'com.adobe.browser.event.TransferRequest',
//     'com.adobe.browser.event.UpdateDynamicColumnFields',
//     'com.adobe.browser.event.WriteXMPToDisk',
//     'com.adobe.ccx.start.handleLicenseBanner',
//     'com.adobe.csxs.events.ApplicationActivate',
//     'com.adobe.csxs.events.ApplicationBeforeQuit',
//     'com.adobe.csxs.events.AppOffline',
//     'com.adobe.csxs.events.AppOnline',
//     'com.adobe.csxs.events.CustomApplicationEventWithoutPayload',
//     'com.adobe.csxs.events.CustomApplicationEventWithPayload',
//     'com.adobe.csxs.events.DocumentAfterActivate',
//     'com.adobe.csxs.events.DocumentAfterDeactivate',
//     'com.adobe.csxs.events.DocumentAfterSave',
//     'com.adobe.csxs.events.ExtensionUnloaded',
//     'com.adobe.csxs.events.ExtensionLoaded',
//     'com.adobe.csxs.events.flyoutMenuClicked',
//     'com.adobe.csxs.events.flyoutMenuOpened',
//     'com.adobe.csxs.events.flyoutMenuClosed',
//     'com.adobe.csxs.events.OkClicked',
//     'com.adobe.csxs.events.panelWindowStatusChanged',
//     'com.adobe.csxs.events.PanelWindowStatusChanged',
//     'com.adobe.csxs.events.PProPanelRenderEvent',
//     'com.adobe.csxs.events.ThemeColorChanged',
//     'com.adobe.csxs.events.WindowVisibilityChanged',
//     'com.adobe.csxs.events.WorkspaceChanged',
//     'com.adobe.event.applyDissolve',
//     'com.adobe.event.unloadDissolveExtension',
//     'com.adobe.events.ApplyUnassociatedMetadata',
//     'com.adobe.events.selectedMarkerEvent',
//     'com.adobe.events.SendUnassociatedMetadata',
//     'com.adobe.events.TextFieldFocusIn',
//     'com.adobe.events.TextFieldFocusOut',
//     'com.adobe.host.notification.AppExit',
//     'com.adobe.host.notification.ConcatenationProgress',
//     'com.adobe.host.notification.ConcatenationStatus',
//     'com.adobe.host.notification.DeleteDynamicColumnsStatus',
//     'com.adobe.host.notification.ExportResultInfo',
//     'com.adobe.host.notification.GetAssociatedFilesStatus',
//     'com.adobe.host.notification.GetCurrentWorkModeStatus',
//     'com.adobe.host.notification.IngestItemsReady',
//     'com.adobe.host.notification.InsertDynamicColumnsStatus',
//     'com.adobe.host.notification.MarkerAdded',
//     'com.adobe.host.notification.MarkerChanged',
//     'com.adobe.host.notification.MarkerDeleted',
//     'com.adobe.host.notification.MarkerSelectionChanged',
//     'com.adobe.host.notification.OpenIngestDialogStatus',
//     'com.adobe.host.notification.ReadXMPFromCacheStatus',
//     'com.adobe.host.notification.ReadXMPFromDiskStatus',
//     'com.adobe.host.notification.RenameStatus',
//     'com.adobe.host.notification.SaveAsset',
//     'com.adobe.host.notification.SelectedAssetInfo',
//     'com.adobe.host.notification.SendTagTemplateStatus',
//     'com.adobe.host.notification.TranscodeProgress',
//     'com.adobe.host.notification.TranscodeStatus',
//     'com.adobe.host.notification.TransferProgress',
//     'com.adobe.host.notification.TransferStatus',
//     'com.adobe.host.notification.UpdateDynamicColumnFieldsStatus',
//     'com.adobe.host.notification.WriteXMPToDiskStatus',
//     'com.adobe.PhotoshopJSONCallback',
//     'com.adobe.PhotoshopPersistent',
//     'com.adobe.PhotoshopRegisterEvent',
//     'com.adobe.PhotoshopUnPersistent',
//     'com.adobe.PhotoshopUnRegisterEvent',
//     'documentAfterActivate',
//     'DocumentAfterActivate',
//     'documentAfterDeactivate',
//     'DocumentAfterDeactivate',
//     'documentEdited',
//     'DocumentEdited',
//     'documentAfterSave',
//     'DocumentAfterSave',
//     'documentCreated',
//     'DocumentCreated'
// ];
// eventNames.forEach(function(eventName) {
//     new CSInterface().addEventListener(eventName, async function(evt) {
//         window.console.log(`ON_EVENT ${eventName}: ${JSON.stringify(evt)}`);
//     });
// });

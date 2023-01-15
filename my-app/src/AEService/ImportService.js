import {evalScript} from './Extend';

export default class ImportService {
    static importFile(path, folderId) {
        return evalScript(`importFile('${path}', ${folderId})`);
    }
}

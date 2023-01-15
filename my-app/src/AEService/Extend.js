import {CSInterface} from '@cep/csinterface';


// const csInterface = CSInterface && window.__adobe_cep__ ?
//     new CSInterface() : null;

export const getCSInterface = () => {
    return new CSInterface() || {};
};
export const evalScript = async (script) => {
    const csInterface = getCSInterface();
    return new Promise((resolve) => {
        if (csInterface.evalScript) {
            csInterface.evalScript(script, (result) => {
                try {
                    if (result === 'undefined') {
                        resolve(undefined);
                    } else if (result === 'null') {
                        resolve(null);
                    } else {
                        resolve(JSON.parse(result));
                    }
                } catch (e) {
                    resolve(result);
                }
            });
        } else {
            throw new Error('Executing without CSInterface context.');
        }
    });
};

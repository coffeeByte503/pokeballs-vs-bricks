export async function getArrayBuffer(src, eventEmitter) {

    return new Promise(resolve => {

        const xmlHTTP = new XMLHttpRequest();
        xmlHTTP.open('GET', src.url, true);
        xmlHTTP.responseType = 'arraybuffer';

        xmlHTTP.onloadstart = e => eventEmitter.emit("loadStart", src, e);

        xmlHTTP.onprogress = e => eventEmitter.emit("progress", src, e.loaded);

        xmlHTTP.error = e => eventEmitter.emit("error", src, e);

        xmlHTTP.onload = e => {
            const arrayBuffer = xmlHTTP.response;
            resolve(arrayBuffer);
            //console.log(e, "->" + src.url)
            eventEmitter.emit("load", src, e.loaded)
        };

        xmlHTTP.send(null);
    });
}

export async function getHeaders(url, type) {
    const response = await fetch(url);
    if (response.ok === true) {
        return response.headers.get(type);
    }
    return {};
}

export async function getJSON(url) {
    const response = await fetch(url);
    return response.json();
}
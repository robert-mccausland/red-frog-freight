async function getParcels() {
    const response = await fetch("http://localhost:8000/parcels");
    checkResponse(response);
    return await response.json();
}

async function getParcel(id) {
    const response = await fetch(`http://localhost:8000/parcel/${id}`);
    checkResponse(response);
    return await response.json();
}

async function createParcel(data) {
    const response = await fetch(`http://localhost:8000/parcel`, {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify(data)
    });
    checkResponse(response);
    return await response.json();
}

async function updateParcel(data) {
    const response = await fetch(`http://localhost:8000/parcel/${data._id}`, {
        method: "PUT",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify(data)
    });
    checkResponse(response);
    return await response.json();
}

async function addTracking(parcelId, data) {
    const response = await fetch(`http://localhost:8000/parcel/${parcelId}/tracking`, {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify(data)
    });
    checkResponse(response);
    return await response.json();
}

function checkResponse(response) {
    if (!response.ok) {
        throw Error(`Server responded with non success status: ${response.status} (${response.statusText})`);
    }
}

export {
    getParcel,
    getParcels,
    updateParcel,
    createParcel,
    addTracking
};
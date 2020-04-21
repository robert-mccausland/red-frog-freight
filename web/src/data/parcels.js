import {
    apiHost
} from "../constants";

async function getParcels({
    page,
    limit,
    ordering,
    filter
}) {
    const params = {};
    if (ordering.field) {
        params.orderBy = ordering.field;
    }
    if (ordering.direction) {
        params.orderDir = ordering.direction;
    }
    const response = await fetch(`${apiHost}/parcels` + formatParams(params));
    checkResponse(response);
    return await response.json();
}

async function getParcel(id) {
    const response = await fetch(`${apiHost}/parcel/${id}`);
    checkResponse(response);
    return await response.json();
}

async function createParcel(data) {
    const response = await fetch(`${apiHost}/parcel`, {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json"
        }),
        body: JSON.stringify(data)
    });
    checkResponse(response);
    return await response.json();
}

async function updateParcel(data) {
    const response = await fetch(`${apiHost}/parcel/${data._id}`, {
        method: "PUT",
        headers: new Headers({
            "content-type": "application/json"
        }),
        body: JSON.stringify(data)
    });
    checkResponse(response);
    return await response.json();
}

async function addTracking(parcelId, data) {
    const response = await fetch(`${apiHost}/parcel/${parcelId}/tracking`, {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json"
        }),
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

function formatParams(params) {
    const strings = []
    for (const name in params) {
        strings.push(`${encodeURIComponent(name)}=${encodeURIComponent(params[name])}`);
    }

    if (strings.length > 0) {
        return "?" + strings.join("&");
    } else {
        return "";
    }
}

export {
    getParcel,
    getParcels,
    updateParcel,
    createParcel,
    addTracking
};
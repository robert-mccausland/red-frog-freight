const MongoClient = require("mongodb");
const ObjectId = require("bson").ObjectId;

const url = process.env.MONGO_UYL || "mongodb://localhost:27017"
const dbName = process.env.DB_NAME || "red_frog_freight"
let client;
let collection;

async function connect() {
    client = await new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    collection = client.db(dbName).collection("parcels");
}

async function disconnect() {
    collection = undefined;
    await client.disconnect();
}

async function createParcel(parcel) {
    const uploadEvent = {
        code: "100",
        description: "Uploaded",
        timestamp: new Date(),
        _id: new ObjectId()
    };
    parcel.createdAt = new Date();
    parcel.latestTrackingEvent = uploadEvent;
    parcel.trackingEvents = [uploadEvent];
    await collection.insertOne(parcel);
    return parcel;
}

async function updateParcel(id, parcel) {
    const result = await collection.findOneAndUpdate({ _id: ObjectId(id) }, { $set: parcel }, { returnOriginal: false });
    return result.value;
}

async function addTrackingEvent(parcelId, trackingEvent) {
    trackingEvent.timestamp = new Date();
    trackingEvent._id = new ObjectId();
    const result = await collection.findOneAndUpdate({ _id: ObjectId(parcelId) }, {
        $set: {
            latestTrackingEvent: trackingEvent
        },
        $push: { trackingEvents: trackingEvent }
    }, { returnOriginal: false });
    return result.value;
}

async function getParcel(id) {
    return await collection.findOne({ _id: new ObjectId(id) });
}

async function getParcels() {
    return await collection.find({}).toArray();
}

module.exports = {
    connect, disconnect, createParcel, updateParcel, addTrackingEvent, getParcel, getParcels
};
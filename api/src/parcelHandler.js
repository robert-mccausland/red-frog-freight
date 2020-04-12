const parcelData = require("./parcelData");

module.exports = app => {
    app.get("/parcels", async (req, res) => {
        const parcels = await parcelData.getParcels();
        res.send(parcels);
    });

    app.get("/parcel/:id", async (req, res) => {
        const parcel = await parcelData.getParcel(req.params.id);
        if (parcel) {
            res.send(parcel);
        }
        else {
            res.status(404).send()
        }
    });

    app.post("/parcel", async (req, res) => {
        try {
            if (!req.body) {
                res.status(400).send();
                return;
            }

            const { consignmentNumber, parcelNumber, serviceCode } = req.body;
            if (!consignmentNumber || !parcelNumber || !serviceCode) {
                res.status(404).send();
                return;
            }

            const created = await parcelData.createParcel({ consignmentNumber, parcelNumber, serviceCode });
            res.send(created);
        }
        catch (err) {
            console.log(err);
            res.status(500).send();
        }
    });

    app.put("/parcel/:id", async (req, res) => {
        try {
            if (!req.body) {
                res.status(400).send();
                return;
            }

            const { consignmentNumber, parcelNumber, serviceCode } = req.body;
            if (!consignmentNumber && !parcelNumber && !serviceCode) {
                res.status(404).send();
                return;
            }
            const update = {};

            if (consignmentNumber) { update.consignmentNumber = consignmentNumber; }
            if (parcelNumber) { update.parcelNumber = parcelNumber; }
            if (serviceCode) { update.serviceCode = serviceCode; }
            const updated = await parcelData.updateParcel(req.params.id, update);
            res.send(updated);
        }
        catch (err) {
            console.log(err);
            res.status(500).send();
        }
    });


    app.post("/parcel/:id/tracking", async (req, res) => {
        try {
            if (!req.body) {
                res.status(400).send();
                return;
            }

            const { code, description } = req.body;
            if (!code || !description) {
                res.status(404).send();
                return;
            }

            const parcel = await parcelData.addTrackingEvent(req.params.id, req.body);
            if (parcel) {
                res.send(parcel);
            }
            else {
                res.status(404).send()
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send();
        }
    });
}
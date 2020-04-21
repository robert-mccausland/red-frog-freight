const ObjectId = require("bson").ObjectId;
const parcelData = require("./parcelData");

module.exports = app => {
    app.get("/parcels", async (req, res) => {
        const {
            limit,
            page,
            orderBy,
            orderDir
        } = req.query;

        let limitInt;
        let pageInt;
        if (limit) {
            limitInt = parseInt(limit);
        }
        if (page) {
            pageInt = parseInt(page);
        }

        if (orderDir && (orderDir.toLowerCase() !== "asc" && orderDir.toLowerCase() !== "desc")) {
            res.status(400).send("Invalid orderDir, should be 'asc' or 'desc'");
            return;
        };

        const orderByOptions = [
            "consignmentNumber",
            "parcelNumber",
            "serviceCode",
            "createdAt",
            "latestTrackingEvent.timestamp",
        ];

        if (orderBy && !orderByOptions.find(x => x === orderBy)) {
            res.status(400).send(`Invalid orderBy, should be one of: [${orderByOptions.map(x => `'${x}'`).join(", ")}]`);
            return;
        };

        if (limitInt && (limitInt <= 0 || !Number.isInteger(limitInt))) {
            res.status(400).send("Invalid limit, should be a positive integer");
            return;
        }

        if (pageInt && (pageInt <= 0 || !Number.isInteger(pageInt))) {
            res.status(400).send("Invalid page, should be a positive integer");
            return;
        }

        const ordering = {};
        if (orderBy) {
            ordering.field = orderBy;
            ordering.dir = (orderDir || 'asc').toLowerCase();
        }

        const parcels = await parcelData.getParcels(ordering, limitInt || 100, pageInt || 1);
        res.send(parcels);
    });

    app.get("/parcel/:id", async (req, res) => {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(404).send();
            return;
        }

        const parcel = await parcelData.getParcel(req.params.id);

        if (parcel) {
            res.send(parcel);
        } else {
            res.status(404).send();
        }
    });

    app.post("/parcel", async (req, res) => {
        try {
            if (!req.body) {
                res.status(400).send();
                return;
            }

            const {
                consignmentNumber,
                parcelNumber,
                serviceCode
            } = req.body;
            if (!consignmentNumber || !parcelNumber || !serviceCode) {
                res.status(404).send();
                return;
            }

            const created = await parcelData.createParcel({
                consignmentNumber,
                parcelNumber,
                serviceCode
            });
            res.send(created);
        } catch (err) {
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

            const {
                consignmentNumber,
                parcelNumber,
                serviceCode
            } = req.body;
            if (!consignmentNumber && !parcelNumber && !serviceCode) {
                res.status(404).send();
                return;
            }
            const update = {};

            if (consignmentNumber) {
                update.consignmentNumber = consignmentNumber;
            }
            if (parcelNumber) {
                update.parcelNumber = parcelNumber;
            }
            if (serviceCode) {
                update.serviceCode = serviceCode;
            }
            const updated = await parcelData.updateParcel(req.params.id, update);
            res.send(updated);
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    });


    app.post("/parcel/:id/tracking", async (req, res) => {
        try {
            if (!ObjectId.isValid(req.params.id)) {
                res.status(404).send();
                return;
            }

            if (!req.body) {
                res.status(400).send();
                return;
            }

            const {
                code,
                description
            } = req.body;
            if (!code || !description) {
                res.status(404).send();
                return;
            }

            const parcel = await parcelData.addTrackingEvent(req.params.id, req.body);
            if (parcel) {
                res.send(parcel);
            } else {
                res.status(404).send()
            }
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    });
}
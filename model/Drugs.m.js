const { db } = require('../model/Database.m');
module.exports = {
    create: async (data) => {
        await db.collection('Drugs').insertOne(data);
    },
    findDrug: async (ID, Name, Unit) => {
        const rs = await db.collection('Drugs').find({ ID: ID, Name: Name, Unit: Unit }).toArray();
        return rs;
    },
    getAll: async () => {
        const rs = await db.collection('Drugs').find({}).toArray();
        return rs;
    },
    getByName: async (Name) => {
        const rs = await db.collection('Drugs').find({ Name: Name }).toArray();
        return rs;
    },
    getByID: async (ID) => {
        const rs = await db.collection('Drugs').find({ ID: ID }).toArray();
        return rs;
    },
    update: async (ID, data) => {
        await db.collection('Drugs').updateOne({ ID: ID }, { $set: data }, { upsert: true });
    },
    delete: async (ID) => {
        await db.collection('Drugs').deleteOne({ ID: ID });
    }
}
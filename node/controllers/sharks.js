const path = require('path');
const Shark = require('../models/sharks');

exports.index = function (req, res) {
    res.sendFile(path.resolve('views/sharks.html'));
};

exports.create = async function (req, res) {
    try {
        const newShark = new Shark(req.body);
        console.log(req.body);
        await newShark.save();
        res.redirect('/sharks/getshark');
    } catch (err) {
        console.error(err);
        res.status(400).send('Unable to save shark to database');
    }
};

exports.list = async function (req, res) {
    try {
        const sharks = await Shark.find({});
        res.render('getsharks', { sharks });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching sharks from database');
    }
};
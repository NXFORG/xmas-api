const Present = require('../models/Present');

//index
async function index(req, res) {
    try {
        const presents = await Present.all;
        await res.json(presents);
    }
    catch(err) {
        res.status(500).json(err);
    };
};

//show
async function show(req, res) {
    try {
        const present = await Present.findPresentById(parseInt(req.params.id));
        res.json(present);
    }
    catch(err) {
        res.status(404).json(err);
    };
};

async function showByUser(req, res) {
    try {
        const presents = await Present.findPresentByUserId(parseInt(req.params.id), req.params.type);
        res.json(presents);
    }
    catch(err) {
        res.status(404).json(err);
    }
}

//create
async function create(req, res) {
    try {
        const present = await Present.create(req.body);
        res.status(201).json(present);
    }
    catch(err) {
        res.status(422).json(err);
    };
};

//update
async function update(req, res) {
    try {
        const present = await Present.findPresentById(parseInt(req.params.id));
        console.log(present);
        const updatedPresent = await present.update(req.body);
        res.status(204).json(updatedPresent);
    }
    catch (err) {
        res.status(400).json(err);
    };
};

//delete
async function destroy(req, res) {
    try {
        const present = await Present.findPresentById(parseInt(req.params.id));
        await present.destroy();
        res.status(204).end();
    }
    catch(err) {
        res.status(404).json(err);
    };
};

module.exports = { index, show, showByUser, create, update, destroy };
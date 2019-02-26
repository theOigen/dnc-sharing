const { Storage } = require('./storage.js');
const mongoose = require('mongoose');
const PlacementSchema = new mongoose.Schema({
    name: { type: String, require: true },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

const PlacementModel = mongoose.model('Placement', PlacementSchema);



class Placement extends Storage {
    constructor(name, x, y) {
        super();
        this.name = name;
        this.location = {
            type: 'Point',
            coordinates: [x, y]
        }
    }
    static this_model() {
        return PlacementModel;
    }

    static check_params(x) {
        return true;
    }

    static getAll() {
        return PlacementModel.find()
    }

    static getById(id) {
        return PlacementModel.findOne({ _id: id })
    }
    static getByName(name) {
        return PlacementModel.findOne({ name: name })
    }



};


module.exports = { Placement };
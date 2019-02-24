const { Storage } = require('./storage.js');
const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    isOpen: { type: Boolean, default: true },
    author: { type: mongoose.mongo.ObjectId, ref: "User", required: true },
    avaUrl: { type: String, require: true },
    keywords: [{ type: String, require: true }],
    addedAt: { type: Date, default: Date.now },
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

const EventModel = mongoose.model('Event', EventSchema);



class Event extends Storage {
    constructor(title, description, author, avaUrl, keywords, location) {
        super();
        this.title = title;
        this.description = description;
        this.author = author;
        this.avaUrl = avaUrl;
        this.keywords = keywords;
        this.location = location;
    }

    static this_model() {
        return EventModel;
    }

    static check_params(x) {
        return true;
    }

    static getAll() {
        return EventModel.find()
    }

    static getById(id) {
        return EventModel.findOne({ _id: id }).populate("author");
    }



};


module.exports = { Event };
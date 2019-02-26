const { Storage } = require('./storage.js');
const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    isOpen: { type: Boolean, default: true },
    author: { type: mongoose.mongo.ObjectId, ref: "User", required: true },
    place: { type: mongoose.mongo.ObjectId, ref: "Placement", required: true },
    avaUrl: { type: String, require: true },
    keywords: [{ type: String, require: true }],
    addedAt: { type: Date, default: Date.now },
});

const EventModel = mongoose.model('Event', EventSchema);



class Event extends Storage {
    constructor(title, description, author, avaUrl, keywords, place) {
        super();
        this.title = title;
        this.description = description;
        this.author = author;
        this.avaUrl = avaUrl;
        this.keywords = keywords;
        this.place = place;
    }

    static this_model() {
        return EventModel;
    }

    static check_params(x) {
        return true;
    }

    static getAll() {
        return EventModel.find().populate("author").populate("place").exec();
    }

    static getById(id) {
        return EventModel.findOne({ _id: id }).populate("author").populate("place").exec();
    }



};


module.exports = { Event };
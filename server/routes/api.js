const express = require('express');
const router = express.Router();
const { Event } = require('../models/event');
const { Placement } = require('../models/placement');
const { User } = require('../models/user');
const passport = require('passport');
const { Utils } = require('../models/utils');
const authJwt = passport.authenticate("jwt", { session: false });

function pagination(array, page, per_page) {
    const delta = array.length % per_page === 0 ? 0 : 1;
    const maxPage = parseInt(array.length / per_page) + delta;
    if (page > maxPage) page = maxPage;
    let bound = page * per_page;
    if (bound > array.length) bound = array.length;
    return {
        data: array.slice(per_page * (page - 1), bound),
        page: page,
        maxPage: maxPage
    };
}

router.get('/me', authJwt, (req, res) => {

    res.json({ err: req.user ? null : "Not authorized", user: req.user });
});

router.get('/event', async (req, res) => {
    const filters = req.query.filters ? req.query.filters.split(" ") : null;
    const page = req.query.page > 0 ? Number(req.query.page) : 1;
    const per_page = req.query.per_page > 0 ? Number(req.query.per_page) : 5;
    const array = await Event.getAll();
    let result = [];
    if (!filters) {
        result = array;
    }
    else
        array.forEach(event => {
            let isAvailable = true;
            filters.forEach(key => {
                isAvailable = isAvailable
                    && (event.title.includes(key)
                        || event.keywords.includes(key)
                        || event.description.includes(key));
                if (event.title.includes(key)) console.log(`${key} there is in title ${event.title}`)
                if (event.keywords.includes(key)) console.log(`${key} there is in keywords ${event.keywords}`)
                if (event.description.includes(key)) console.log(`${key} there is in description ${event.description}`)
            });
            if (isAvailable) {
                result.push(event);
            }
        });
    console.log(result)
    res.json(pagination(result, page, per_page));
});

router.get('/event/:id', async (req, res) => {
    res.json(await Event.getById(id));
});

router.delete('/event/:id',
    authJwt,
    async (req, res) => {
        const id = req.params.id;
        try {
            const event = await Event.getById(id);
            if (!req.user || !req.user._id === event.author._id)
                throw new Error("Forbidden");
            await Utils.delete_file_promised(event.avaUrl.substring(event.avaUrl.lastIndexOf('/') + 1));
            const id = await Event.delete(id);
            res.json({ data: id });
        }
        catch (err) {
            res.status(400).json({ err: err.message });
        }
    });


router.put('/user/:id',
    authJwt,
    async (req, res) => {
        try {
            console.log('id', req.params.id)
            console.log('_id',req.user._id)
            if (!req.params.id || req.user._id != req.params.id )
                throw new Error("Forbidden");
            req.user.fullname = req.body.fullname ? req.body.fullname : req.user.fullname
            req.user.description = req.body.description ? req.body.description : req.user.description
            if (req.files.ava) {
                await Utils.delete_file_promised(req.user.ava_url.substring(req.user.ava_url.lastIndexOf('/') + 1));
                const result = await Utils.handle_file_upload_promised(Buffer.from(new Uint8Array(req.files.ava.data)));
                req.user.ava_url = result.url;
            }
            res.json(await User.update(req.user))
        }
        catch (err) {
            res.status(400).json({ err: err.message })
        }
        
    });
router.post('/event',
    authJwt,
    async (req, res) => {
        console.log('i am there')
        console.log(req.body);
        try {
            if (!req.user)
                throw new Error("Forbidden");
            else {
                const uploadResult = await Utils.handle_file_upload_promised(Buffer.from(new Uint8Array(req.files.ava.data)));
                const place = await Placement.getByName(req.body.place);
                res.json(await Event.insert(
                    new Event(req.body.title, req.body.description, req.user._id, uploadResult.url, req.body.keywords.split(" "), place._id)
                ));
            }
        }
        catch (err) {
            res.status(400).json({ err: err.message });
        }
    });
router.post('/test', (req, res) => {
    const c = req.body.coordinates;

    const x = parseFloat(c.substring(c.indexOf('(') + 1, c.indexOf(',')));
    const y = parseFloat(c.substring(c.indexOf(',') + 2, c.indexOf(')')));
    Placement.insert(
        new Placement(req.body.name, x, y)
    );
    res.json({});
});



router.get('/places', async (req, res) => {

    res.json(await Placement.getAll());
});

module.exports = router;


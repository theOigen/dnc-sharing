const express = require('express');
const router = express.Router();
const { Event } = require('../models/event');
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
    const filtres = req.query.filtres ? req.query.filtres.split(" ") : null;
    const page = req.query.page > 0 ? Number(req.query.page) : 1;
    const per_page = req.query.per_page > 0 ? Number(req.query.per_page) : 5;
    const array = await Event.getAll();
    let result = [];
    if (!filtres) {
        result = array;
    }
    else
        array.forEach(event => {
            let isAvailable = true;
            filtres.forEach(key => {
                isAvailable = isAvailable
                    && (event.title.includes(key)
                        || event.keywords.includes(key)
                        || event.description.includes(key));
            });
            if (isAvailable) {
                result.push(event);
            }
        });
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

// router.put('/articles',
//     authJwt,
//     async (req, res) => {
//         const currentPage = !req.query.page || isNaN(Number(req.query.page)) || Number(req.query.page) <= 0 ? 1 : Number(req.query.page);
//         if (!req.body.id) res.json({ errorCode: 400, errorMassage: 'Bad request' });
//         else {
//             try {
//                 let art = await Article.getArticleByID(req.body.id);
//                 if (!req.user || !req.user._id == art.author._id) {
//                     res.json({ errorCode: 400, errorMassage: "Недостаточно привелегий" });
//                     return;
//                 }
//                 art.shortReview = req.body.shortReview ? req.body.shortReview : art.shortReview;
//                 art.title = req.body.title ? req.body.title : art.title;
//                 art.likes = req.body.likes ? Number(req.body.likes) : art.likes;
//                 art.text = req.body.text ? Article.textTranslation(req.body.text) : art.text;
//                 if (req.files.Ava) {
//                     await Utils.delete_file_promised(art.avaUrl.substring(art.avaUrl.lastIndexOf('/') + 1));
//                     const result = await Utils.handle_file_upload_promised(Buffer.from(new Uint8Array(req.files.Ava.data)));
//                     art.avaUrl = result.url;
//                 }
//                 const updatedArticle = await Article.update(art);
//                 res.json(articleToResult(updatedArticle, currentPage, req.user));
//             }
//             catch (err) {
//                 res.json({ errorCode: 400, errorMassage: err.message, errorStack: err.stack });
//             }
//         }
//     });
router.post('/event',
    authJwt,
    async (req, res) => {

        try {
            if (!req.user)
                throw new Error("Forbidden");
            else {
                const uploadResult = await Utils.handle_file_upload_promised(Buffer.from(new Uint8Array(req.files.ava.data)));
                res.json(await Event.insert(
                    new Event(req.body.title, req.body.description, req.user._id, uploadResult.url, req.body.keywords.split(" "))
                ));
            }
        }
        catch (err) {
            res.json({ err: err.message });
        }
    });

module.exports = router;


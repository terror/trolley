const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then((items) => res.json(items));
});

// @route POST api/items
// @desc Create Item
// @access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        desc: req.body.desc,
        cost: req.body.cost,
    });
    newItem.save().then((item) => res.json(item));
});

// @route DELETE api/items/:id
// @desc Delete Item
// @access Public
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) throw Error('No item found');

        const removed = await item.remove();
        if (!removed)
            throw Error('Something went wrong while trying to delete the item');

        res.status(200).json({ success: true });
    } catch (e) {
        res.status(400).json({ msg: e.message, success: false });
    }
});

module.exports = router;

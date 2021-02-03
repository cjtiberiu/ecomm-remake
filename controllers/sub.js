const Sub = require('../models/Sub');
const slugify = require('slugify');
const e = require('express');

const create = async (req, res) => {

    try {
        const { name, parent } = req.body;
        const category = await new Sub({ name, slug: slugify(name), parent }).save();
        res.json(category);
    } catch(error) {
        res.status(400).json({ message: `Sub-Category create failed: ${error.name}` });
    }

};

const list = async (req, res) => {

    Sub.find().then(sub => res.json({ sub })).catch(err => res.status(400).json({ message: err}))

};

const read = async (req, res) => {
    const { slug } = req.params;

    try {
        const category = await Sub.findOne({slug});

        if (category) {
            res.json({ category });
        } else {
            res.status(400).json({ message: 'Sub-Category not found' })
        }
        
    } catch(error) {
        res.status(400).json({ message: error })
    }
};


const update = async (req, res) => {
    const { slug } = req.params;
    const { name, parent } = req.body;

    try {
        const category = await Sub.findOneAndUpdate({slug}, {name, slug: slugify(name), parent }, { new: true });

        if (category) {
            res.json({ message: 'Sub-Category succesfully updated'});
        } else {
            res.status(400).json({ message: 'This sub-category could not be updated'})
        }
                      
    } catch(error) {
        res.status(400).json({ message: error })
    }
};

const remove = async (req, res) => {
    const { slug } = req.params;

    try {
        const category = await Sub.findOneAndDelete({slug});

        if (category) {
            res.json({ message: `${category.name} was succesfully deleted` })
        } else {
            res.status(400).json({ message: 'Sub-Category could not be deleted'})
        }

    } catch(error) {
        res.status(400).json({ message: error });
    }
};

module.exports = {
    list,
    create,
    read,
    update,
    remove
}

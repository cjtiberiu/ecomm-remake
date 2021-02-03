const Category = require('../models/Category');
const slugify = require('slugify');
const e = require('express');

const createCategory = async (req, res) => {

    try {
        const { name } = req.body;
        const category = await new Category({ name, slug: slugify(name) }).save();
        res.json(category);
    } catch(error) {
        res.status(400).json({ message: `Category create failed: ${error.name}` });
    }

};

const listCategories = async (req, res) => {

    Category.find().then(categories => res.json({ categories })).catch(err => res.status(400).json({ message: err}))

};

const readCategory = async (req, res) => {
    const { slug } = req.params;

    try {
        const category = await Category.findOne({slug});

        if (category) {
            res.json({ category });
        } else {
            res.status(400).json({ message: 'Category not found' })
        }
        
    } catch(error) {
        res.status(400).json({ message: error })
    }
};


const updateCategory = async (req, res) => {
    const { slug } = req.params;
    const { name } = req.body;

    try {
        const category = await Category.findOneAndUpdate({slug}, {name, slug: slugify(name) }, { new: true });

        if (category) {
            res.json({ message: 'Category succesfully updated'});
        } else {
            res.status(400).json({ message: 'This category could not be updated'})
        }
                      
    } catch(error) {
        res.status(400).json({ message: error })
    }
};

const removeCategory = async (req, res) => {
    const { slug } = req.params;

    try {
        const category = await Category.findOneAndDelete({slug});

        if (category) {
            res.json({ message: `${category.name} was succesfully deleted` })
        } else {
            res.status(400).json({ message: 'Category could not be deleted'})
        }

    } catch(error) {
        res.status(400).json({ message: error });
    }
};

module.exports = {
    listCategories,
    createCategory,
    readCategory,
    updateCategory,
    removeCategory
}

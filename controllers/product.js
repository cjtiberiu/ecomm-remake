const Product = require('../models/Product');
const User = require('../models/User');
const slugify = require('slugify');

const create = async (req, res) => {    

    try {
        req.body.product.slug = slugify(req.body.product.title);
        const newProduct = await new Product(req.body.product).save();
        res.json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const listAll = async (req, res) => {

    Product.find().limit(10).populate('category').populate('subs').sort([['createdAt', 'desc']]).then(products => res.json(products)).catch(err => res.status(400).json({ message: err.message}));
}

const read = async (req, res) => {

    const { id } = req.params;

    try {
        const product = await Product.findById(id).populate('category').populate('subs');

        if (product) {
            res.send(product);
        } else {
            res.status(400).json({ message: 'Product could not be found' })
        }
    } catch(err) {
        res.status(400).json({ message: err })
    }
};

const remove = async (req, res) => {

    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.send('Product deleted');
    } catch(err) {
        res.status(400).json({ message: err })
    }
}

const update = async (req, res) => {

    const { id } = req.params;
    const { product } = req.body;

    try {

        const updatedProduct = await Product.findOneAndUpdate({_id: id}, product, { new: true })

        if (updatedProduct) {
            res.send('Product succesfully updated');
        } else {
            res.send('Product not found');
        }

    } catch(err) {
        res.status(400).json({ message: err })
    }
}

const list = async (req, res) => {

    try {

        const { sort, order, page } = req.body;

        const currentPage = page || 1;
        const productsPerPage = 20;
    
        const products = await Product.find()
            .skip((currentPage - 1) * productsPerPage)
            .populate('category')
            .populate('subs')
            .sort([[sort, order]])
            .limit(productsPerPage)
            .exec();
    
        res.json(products);

    } catch (err) {
        console.log(err)
    }
    
}

const productsCount = async (req, res) => {
    let total = await Product.find().estimatedDocumentCount().exec();

    res.json(total);
}

const getRelated = async (req, res) => {
    const { sub } = req.params;

    Product
        .find({ subs: sub })
        .limit(3)
        .then(products => {
            res.send(products)
        })
        .catch(err => res.status(400).json({ message: err }));
}

const productRating = async (req, res) => {
    const { id } = req.params;
    const { star } = req.body;

    const product = await Product.findById(id).exec();
    const user = await User.findOne({ email: req.user.email }).exec();

    // Check if currently logged in user has already added rating to the product
    let existingRating = product.ratings.find(el => el.postedBy.toString() == user._id.toString());

    // If user haven't added any rating to the product, push the rating to rating array
    if (existingRating === undefined) {
        let addRating = await Product.findByIdAndUpdate(
            product._id, 
            {
                $push: { ratings: { star, postedBy: user._id } }
            }, 
            { new: true }
        ).exec();

        res.json(addRating);
    }

    // If user already added rating, update it
    if (existingRating) {
        const rating = await Product.updateOne(
            { ratings: { $elemMatch: existingRating } }, 
            { $set: { 'ratings.$.star': star } },
            { new: true }
        ).exec();

        res.json(rating);
    }
};

const getProductRating = async (req, res) => {
    const { id } = req.params;

    if (id === undefined) return;

    const product = await Product.findById(req.params.id).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    let existingRating = product.ratings.find(el => el.postedBy.toString() == user._id.toString());

    if (existingRating) {
        res.json(existingRating.star);
    } else {
        res.json(0)
    }
}

// filters

const handleQuery = async (req, res, query) => {
    const products = await Product.find({ title: { $regex: query, $options: 'i' } })
        .populate('category', '_id name')
        .populate('subs', '_id name')
        .exec()

    res.json(products);
}

const handlePrice = async (req, res, price) => {
    try {
        let products = await Product.find({
            price: {
                $gte: price[0],
                $lte: price[1]
            },
        })
        .populate('category', '_id name')
        .populate('subs', '_id name')
        .exec();

        res.json(products);
        
    } catch (err) {
        console.log(err)
    }
}

const searchProducts = async (req, res) => {
    const { text, price, category, stars, color, brand, sort, order, page } = req.body;

    const currentPage = page || 1;
    const productsPerPage = 12;
    
    const query = {};

    if (text) {
        query.title = { $regex: text, $options: 'i' }
    }

    if (price) {
        query.price = {
            $gte: price[0],
            $lte: price[1]
        }
    }

    if (category !== '') {
        query.category = category;
    }

    if (color) {
        query.color = color;
    }

    if (brand) {
        query.brand = brand;
    }

    let products;

    const productsCount = await Product.find(query).exec();

    products = await Product.find(query)
        .skip((currentPage - 1) * productsPerPage)
        .populate('category', '_id name')
        .populate('subs', '_id name')
        .sort([[sort, order]])
        .limit(productsPerPage)
        .exec()

        

    // let products;

    // if (category) {
    //     products = await Product.find({ 
    //         title: { $regex: text, $options: 'i' }, 
    //         price: {
    //             $gte: price[0],
    //             $lte: price[1]
    //         },
    //         category: category,
    //         color: color
    //     })
    //     .populate('category', '_id name')
    //     .populate('subs', '_id name')
    //     .exec()
    // } else {
    //     products = await Product.find({ 
    //         title: { $regex: text, $options: 'i' }, 
    //         price: {
    //             $gte: price[0],
    //             $lte: price[1]
    //         },
    //         color: color
    //     })
    //     .populate('category', '_id name')
    //     .populate('subs', '_id name')
    //     .exec()
    // }

    // console.log(stars);

    if (stars) {
        let total;
        products = products.filter(product => {
            
            if(product.ratings.length > 0) {
                total = product.ratings.reduce((a, b) => {
                    return a + b.star
                }, 0);
                if (Math.floor(total / product.ratings.length) === stars) {
                    return product;
                }
            }
            
        })
    }

    res.json({ products, productsCount: productsCount.length });

}

const getPriceRange =  async (req, res) => {
    
    const products  = await Product.find().sort([['price', 'asc']]).exec();
    
    res.json({ minValue: products[0].price, maxValue: products[products.length - 1].price })
}

module.exports = {
    create,
    listAll,
    list,
    read,
    remove,
    update,
    productsCount,
    getRelated,
    productRating,
    getProductRating,
    searchProducts,
    getPriceRange
}
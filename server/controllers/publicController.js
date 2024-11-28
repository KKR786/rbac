const Site = require('../models/site')
const Product = require('../models/product')

const getBanners = async (req, res) => {
    const { id } = req.params;

    const selectedSite = await Site.findOne({ _id: id }).select('banners')

    if (!selectedSite) {
        return res.status(404).json({error: 'No such Site'})
    }

    res.status(200).json(selectedSite)    
}

const getProduct = async (req, res) => {
    const { id } = req.params;

    const selectedProduct = await Product.findOne({ _id: id })

    if (!selectedProduct) {
        return res.status(404).json({error: 'No such Site'})
    }

    res.status(200).json(selectedProduct)    
}

module.exports = { getBanners, getProduct }
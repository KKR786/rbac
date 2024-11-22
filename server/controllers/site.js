const Site = require('../models/site')

const newSite = async (req, res) => {
    const logo = req.files ? req.files.map(file => file.path) : [];

    const { name } = req.body;

    let emptyFields = [];
  
    if (!name) emptyFields.push('name');

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }
  
    try {
        const site = await Site.create({
            name,
            logo
        });
      res.status(201).json(site)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

//banner
const addBanner = async (req, res) => {
    const { id } = req.params;

    const newBanners = req.files ? req.files.map(file => file.path) : [];

    try {
        const site = await Site.findById(id);

        if (!site) {
            return res.status(404).json({ error: 'Site not found' });
        }

        const currentBannersCount = site.banners.length;

        if (currentBannersCount + newBanners.length <= 5) {
            site.banners.push(...newBanners);

            await site.save();

            return res.status(200).json(site);
        } else {
            return res.status(400).json({
                error: `You can only upload up to 5 banners. You already have ${currentBannersCount} banners.`
            });
        }
    } catch (error) {
      res.status(400).json({error: error.message})
    }

}

const getSite = async (req, res) => {
    const { id } = req.params;

    const selectedSite = await Site.findOne({ _id: id })

    if (!selectedSite) {
        return res.status(404).json({error: 'No such Site'})
    }

    res.status(200).json(selectedSite)    
}


const deleteSite = async (req, res) => {
    const { id } = req.params

    const deletedSite = await Site.findOneAndDelete({_id: id})

    if (!deletedSite) {
        return res.status(404).json({error: 'No such Site'})
    }

    res.status(200).json(deletedSite)
}

const getSiteList = async (req, res) => {
    const siteList = await Site.find()
    res.status(200).json(siteList)
}

module.exports = { newSite, getSiteList, getSite, deleteSite, addBanner }
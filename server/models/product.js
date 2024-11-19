const mongoose = require('mongoose');
const Sequence = require('./sequence')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id: {
        type: Number
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: [0.01, 'Price must be greater than zero']
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    images: [{
        type: String
    }],
  }, { timestamps: true });
  
  productSchema.pre('save', async function (next) {
    if (this.isNew) {
      try {
        const sequenceDoc = await Sequence.findByIdAndUpdate(
          'product_id',
          { $inc: { sequence_value: 1 } },
          { new: true, upsert: true }
        ).exec();
  
        this._id = sequenceDoc.sequence_value;
      } catch (err) {
        return next(err);
      }
    }
  
    next();
  });

module.exports = mongoose.model('Product', productSchema);
const mongoose = require('mongoose');
const Sequence = require('./sequence')

const Schema = mongoose.Schema;

const siteSchema = new Schema({
    _id: {
        type: Number
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    logo: {
        type: String,
    },
  }, { timestamps: true });
  
  siteSchema.pre('save', async function (next) {
    if (this.isNew) {
      try {
        const sequenceDoc = await Sequence.findByIdAndUpdate(
          'site_id',
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

module.exports = mongoose.model('Site', siteSchema);
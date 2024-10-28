const mongoose = require('mongoose');
const Sequence = require('./sequence')

const Schema = mongoose.Schema;

const roleSchema = new Schema({
    _id: {
        type: Number
    },
    role: {
      type: String,
      required: true,
      unique: true
    },
    permissions: [
        {
            type: String,
            required: true,
        }
    ]
  }, { timestamps: true });
  
  roleSchema.pre('save', async function (next) {
    if (this.isNew) {
      try {
        const sequenceDoc = await Sequence.findByIdAndUpdate(
          'roleId',
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

module.exports = mongoose.model('Role', roleSchema);
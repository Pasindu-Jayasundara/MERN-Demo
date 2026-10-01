const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      enum: ['maya', 'jordan', 'you'],
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Message', messageSchema)

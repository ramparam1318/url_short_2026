const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
  {
    timestamp: { type: Date, default: Date.now },
    ip: { type: String, default: '' },
    userAgent: { type: String, default: '' },
    referrer: { type: String, default: '' },
  },
  { _id: false }
);

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      minlength: 4,
      maxlength: 32,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    visitHistory: {
      type: [visitSchema],
      default: [],
    },
    expiresAt: {
      type: Date,
      default: null,
    },
    // createdby: {
    //   type: String,
    //   default: 'anonymous',
    // }
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0, partialFilterExpression: { expiresAt: { $type: 'date' } } });

const Url = mongoose.model('Url', urlSchema);

module.exports = { Url };
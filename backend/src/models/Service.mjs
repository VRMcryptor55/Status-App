import mongoose from 'mongoose';

// Schema for a monitored service
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ['Operational', 'Degraded Performance', 'Partial Outage', 'Major Outage'],
    default: 'Operational',
  }
}, { timestamps: true }); // adds createdAt and updatedAt fields

export default mongoose.model('Service', serviceSchema);

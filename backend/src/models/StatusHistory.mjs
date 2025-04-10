import mongoose from 'mongoose';

// Schema for tracking service status change history
const statusHistorySchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' }, // related service
  status: String,                                                     // new status set
  changedAt: { type: Date, default: Date.now },                       // when it was changed
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }    // who changed it
});

export default mongoose.model('StatusHistory', statusHistorySchema);

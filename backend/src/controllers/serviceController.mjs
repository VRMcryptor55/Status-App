import Service from '../models/Service.mjs';
import StatusHistory from '../models/StatusHistory.mjs';

// Get all services
export const getServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

// Create a new service and record its initial status
export const createService = async (req, res) => {
  const service = new Service(req.body);
  await service.save();

  await new StatusHistory({
    serviceId: service._id,
    status: service.status,
    changedBy: req.user.id
  }).save();

  req.app.get('io').emit('statusUpdate', service);
  res.status(201).json(service);
};

// Update service status and log the change
export const updateService = async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });

  await new StatusHistory({
    serviceId: service._id,
    status: service.status,
    changedBy: req.user.id
  }).save();

  req.app.get('io').emit('statusUpdate', service);
  res.json(service);
};

// Delete a service and notify clients
export const deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  req.app.get('io').emit('statusUpdate', { id: req.params.id, deleted: true });
  res.status(204).end();
};

// Get status history for a specific service
export const getStatusHistory = async (req, res) => {
  const history = await StatusHistory.find({ serviceId: req.params.id })
    .populate('changedBy', 'email');
  res.json(history);
};

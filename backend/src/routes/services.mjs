import express from 'express';
import {
  getServices,
  createService,
  updateService,
  deleteService,
  getStatusHistory
} from '../controllers/serviceController.mjs';
import { protect, adminOnly } from '../middleware/auth.mjs';

const router = express.Router();

// Public routes
router.get('/', getServices);                // Get all services
router.get('/:id/history', getStatusHistory); // Get status history for a service

// Protected admin routes
router.post('/', protect, adminOnly, createService);    // Create new service
router.put('/:id', protect, adminOnly, updateService);  // Update service status
router.delete('/:id', protect, adminOnly, deleteService); // Delete service

export default router;

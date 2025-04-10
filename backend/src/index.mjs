import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { connectDB } from './config/db.mjs';
import authRoutes from './routes/auth.mjs';
import serviceRoutes from './routes/services.mjs';

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } }); // WebSocket server

app.use(cors());
app.use(express.json());
app.set('io', io); // Attach io instance to app for use in controllers

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);

// WebSocket connection listener
io.on('connection', socket => {
  console.log('Socket connected');
});

// Start the server
httpServer.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);

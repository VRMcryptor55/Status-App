import mongoose from 'mongoose';

// Schema for user authentication and role-based access
const userSchema = new mongoose.Schema({
  email: String, // user email
  password: String, // hashed password
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' } // user role
});

export default mongoose.model('User', userSchema);

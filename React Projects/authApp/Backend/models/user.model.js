import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  fullname: { type: String, required: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model('User', userSchema);

export default userModel;

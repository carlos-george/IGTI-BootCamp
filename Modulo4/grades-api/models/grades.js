import mongoose from "mongoose";

const GradesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  subject: {
    type: String,
  },
  type: {
    type: String,
  },
  value: {
    type: Number,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Grades", GradesSchema);

import mongoose from "mongoose";

const appSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  category: String,
  image: String,
  sold: {
    type: Boolean,
    default: false,
  },
  dateOfSale: Date,
  month: Number,
});

const App = mongoose.model("App", appSchema);

export default App;

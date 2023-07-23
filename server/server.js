const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { mongoConnect } = require('./database');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Mongoose schema for inventory items
const itemSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  price: Number,
  manufacturer: String,
  imageUrl: String,
});

const Item = mongoose.model('Item', itemSchema);

mongoConnect(() => {
  app.listen(process.env.PORT || 8000, () => console.log(`Server running on port ${process.env.PORT || 8000}`));
});

// Get all items
app.get('/items', async (req, res) => {
  const items = await Item.find({});
  res.json(items);
});

// Create a new item
app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.status(201).json({
    message: 'Item created successfully',
    item: newItem,
  });
});

app.delete('/drop', async (req, res) => {
  console.log("drop was called")
  try {
    await Item.collection.drop();
    res.status(200).send({ message: 'All items deleted' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'An error occurred when deleting all items' });
  }
});

// Delete an item by id
app.delete('/items/:id', async (req, res) => {
  const id = req.params.id;
  await Item.findByIdAndRemove(id);
  res.status(200).send('Item deleted');
});

// Update an item by id
app.put('/items/:id', async (req, res) => {
  const id = req.params.id;
  const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({
    message: 'Item updated successfully',
    item: updatedItem,
  });
});
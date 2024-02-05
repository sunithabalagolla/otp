
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://sunithabalagolla:sunithabalagolla@cluster0.mr0bwxg.mongodb.net', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const ImageSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  imageBase64: Buffer
});

const Image = mongoose.model('Image', ImageSchema);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());

app.post('/upload', upload.single('image'), (req, res) => {
  const newImage = new Image({
    filename: req.file.originalname,
    contentType: req.file.mimetype,
    imageBase64: req.file.buffer
  });

  newImage.save()
    .then(() => res.json({ message: 'Image uploaded successfully' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Route to fetch all image data
app.get('/images', async (req, res) => {
  try {
    const images = await Image.find().select('imageBase64'); // Retrieve only imageBase64
    const imageUrls = images.map(image => `data:${image.contentType};base64,${image.imageBase64.toString('base64')}`);
    res.json(imageUrls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
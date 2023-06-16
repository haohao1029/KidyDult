import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors());

// Set up multer to store uploaded files in the './public/data' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/data')
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const filename = `${file.originalname}-${timestamp}`;
    cb(null, filename)
  }
})

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/upload', upload.array('files'), (req, res) => {
  try {
    res.send('Files uploaded successfully.');
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

export default app;
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// API: Get Brand list metadata
app.get('/api/brands', (req, res) => {
  res.json([
    {
      id: 'paidhuethicalfoods',
      name: 'Paidhu Ethical Foods',
      description: "Paidhu – The Edible Flower Co. offers premium edible flower-based foods, including Bloom Cookies, Petal Jams, Medley Teas, Brew Flora, and Saffron, crafted with natural ingredients. We are committed to healthy, preservative-free, and ethically made products that bring wellness and floral goodness to everyday life.",
      url: 'https://paidhuethicalfoods.com',
      logo: '/assets/paidhu_logo_white.png'
    },
    {
      id: 'paidhusaffron',
      name: 'Paidhu Saffron',
      description: "Paidhu Saffron offers the world's finest, ethically sourced grade-A Kashmiri Saffron, handpicked for its rich aroma, deep crimson color, and unparalleled purity. We are committed to delivering authentic, premium saffron that brings natural wellness, gourmet flavor, and exquisite quality to everyday life.",
      url: 'https://paidhusaffron.com',
      logo: '/assets/paidhu_monogram_white.png'
    },
    {
      id: 'floffi',
      name: 'Floffi',
      description: "Floffi offers a delightful range of jams, sauces, spreads, and everyday food products made with carefully selected quality ingredients. We are committed to delivering great taste, freshness, and trusted quality in every product for you and your family.",
      url: 'https://floffi.in',
      logo: '/assets/fluffy_logo.png'
    },
    {
      id: 'viyara',
      name: 'Viyara',
      description: "VIYARA is a tech-enabled software and marketing agency helping businesses grow through innovative technology and data-driven strategies. We deliver scalable software, impactful digital experiences, and performance-focused marketing solutions that drive growth, improve efficiency, and create lasting business success.",
      url: 'https://viyara.co.in',
      logo: '/assets/viyara_logo.png'
    },
    {
      id: 'kalikasphere',
      name: 'KalikaSphere',
      description: "Kalikasphere is a creative learning and innovation platform focused on empowering individuals and businesses through education, creativity, technology, and community-driven experiences. We provide workshops, digital solutions, strategic consulting, and innovative programs that inspire growth, collaboration, and lifelong learning.",
      url: 'https://kalikasphere.com',
      logo: '/assets/collegebear_logo.png'
    }
  ]);
});

// API: Contact Submit Mock
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }
  console.log(`Received contact message from ${name} (${email}): ${message}`);
  return res.json({ success: true, message: 'Thank you for reaching out! We will contact you soon.' });
});

// Serve frontend static build files in production
const frontendBuildPath = path.join(__dirname, '../../client/dist');
app.use(express.static(frontendBuildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Paidhu Group backend server running on port ${PORT}`);
});

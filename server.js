require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const { MongoMemoryServer } = require('mongodb-memory-server');
const path = require('path');

const models = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Default fallback for local testing

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set true if using HTTPS
}));

// Auth Middleware
const requireAuth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.redirect('/admin/login');
  }
};

// --- Database Connection & Seeding ---
async function connectDB() {
  let uri = process.env.MONGO_URI;
  if (!uri) {
    console.log('No MONGO_URI found. Starting in-memory MongoDB for local development...');
    const mongoServer = await MongoMemoryServer.create();
    uri = mongoServer.getUri();
  }
  
  await mongoose.connect(uri);
  console.log(`Connected to MongoDB at ${uri.split('@').pop()}`);
  
  // Seed Database if empty
  const profileCount = await models.Profile.countDocuments();
  if (profileCount === 0) {
    console.log('Database empty. Seeding initial portfolio data...');
    await seedDatabase();
  }
}

async function seedDatabase() {
  await models.Profile.create({});
  
  await models.Project.insertMany([
    { title: 'Smart Civic Issue Reporting', description: 'Automated civic complaint reporting platform combining live location tracking with deep learning image classification to streamline municipal issue resolution.', technologies: ['React', 'Node.js', 'MobileNetV2'], order: 1 },
    { title: 'Human Suspicious Activity Detection', description: 'Intelligent surveillance system leveraging ResNet to monitor and classify human behaviors in real-time, automating alerts for security threats.', technologies: ['Python', 'ResNet', 'Tkinter'], order: 2 },
    { title: 'Twitter Sentiment Analysis', description: 'Sentiment analysis application processing Twitter data using Natural Language Processing (NLP), achieving over 85% accuracy in classification.', technologies: ['Python', 'NLP'], order: 3 }
  ]);

  await models.Skill.insertMany([
    { category: 'Languages', items: ['C/C++', 'Python', 'Java'], order: 1 },
    { category: 'Frameworks & Technologies', items: ['React', 'Node.js', 'Express.js', 'MySQL'], order: 2 }
  ]);

  await models.Certification.insertMany([
    { name: 'Agentforce Specialist', issuer: 'Salesforce', date: 'Dec 2025', order: 1 },
    { name: 'TCS iON Career Edge – AI Foundation', issuer: 'Tata Consultancy Services', date: 'Jul 2026', order: 2 },
    { name: 'Java Full Stack', issuer: 'Wipro', date: '', order: 3 },
    { name: 'Data Structures & Algorithms (Java)', issuer: 'Apna College', date: 'Mar 2025', order: 4 },
    { name: 'Generative AI Virtual Internship', issuer: 'AICTE', date: 'Dec 2024', order: 5 },
    { name: 'Software Engineering Job Simulation', issuer: 'JPMorgan Chase & Co. via Forage', date: 'Jul 2025', order: 6 }
  ]);

  await models.CodingProfile.insertMany([
    { platform: 'LeetCode', username: '@teja_katkam_29', profileUrl: 'https://leetcode.com/u/teja_katkam_29/', metric1Label: 'Solved', metric1Value: '133', metric2Label: 'Easy', metric2Value: '76', color: 'emerald', order: 1 },
    { platform: 'CodeChef', username: '@tejakatkam_29', profileUrl: 'https://www.codechef.com/users/tejakatkam_29', metric1Label: 'Star', metric1Value: '1★', metric2Label: 'Rating', metric2Value: '954', color: 'accent', order: 2 },
    { platform: 'Codeforces', username: '@227r1a6627', profileUrl: 'https://codeforces.com/profile/227r1a6627', metric1Label: 'Rank', metric1Value: 'Newbie', metric2Label: 'Rating', metric2Value: '538', color: 'text-main', order: 3 }
  ]);

  await models.Education.create({
    institution: 'CMR Technical Campus',
    degree: 'B.Tech CS (AI & ML)',
    duration: 'Nov 2022 to Present',
    order: 1
  });

  await models.Achievement.insertMany([
    { title: 'TCS CodeVita Season 13', description: 'Global Rank 7802.', order: 1 },
    { title: 'HackerEarth', description: 'Ranked 2nd in a college-level coding contest.', order: 2 },
    { title: 'Institution’s Innovation Day', description: 'Secured 3rd place with a “Human Following Robot” prototype.', order: 3 },
    { title: 'Problem Solving', description: 'Solved 500+ DSA problems across multiple coding platforms.', order: 4 }
  ]);
  
  console.log('Seeding complete.');
}

// --- Public Routes ---
app.get('/', async (req, res) => {
  try {
    const profile = await models.Profile.findOne() || {};
    const projects = await models.Project.find().sort('order');
    const skills = await models.Skill.find().sort('order');
    const certifications = await models.Certification.find().sort('order');
    const codingProfiles = await models.CodingProfile.find().sort('order');
    const education = await models.Education.find().sort('order');
    const achievements = await models.Achievement.find().sort('order');

    res.render('index', { 
      profile, projects, skills, certifications, codingProfiles, education, achievements 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading portfolio');
  }
});

// --- Admin Auth Routes ---
app.get('/admin/login', (req, res) => {
  if (req.session.isAuthenticated) return res.redirect('/admin');
  res.render('login', { error: null });
});

app.post('/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    req.session.isAuthenticated = true;
    res.redirect('/admin');
  } else {
    res.render('login', { error: 'Invalid password' });
  }
});

app.get('/admin/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// --- Admin Dashboard Routes ---
app.get('/admin', requireAuth, async (req, res) => {
  try {
    const profile = await models.Profile.findOne() || {};
    const projects = await models.Project.find().sort('order');
    const skills = await models.Skill.find().sort('order');
    const certifications = await models.Certification.find().sort('order');
    const codingProfiles = await models.CodingProfile.find().sort('order');
    const achievements = await models.Achievement.find().sort('order');

    res.render('admin', { 
      profile, projects, skills, certifications, codingProfiles, achievements 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading admin dashboard');
  }
});

// Admin API routes for updating
app.post('/admin/api/profile', requireAuth, async (req, res) => {
  await models.Profile.findOneAndUpdate({}, req.body, { upsert: true });
  res.redirect('/admin');
});

// Utility for simple CRUD on arrays
const handleCrud = (Model) => async (req, res) => {
  const { action, id, ...data } = req.body;
  if (action === 'create') await Model.create(data);
  else if (action === 'update') await Model.findByIdAndUpdate(id, data);
  else if (action === 'delete') await Model.findByIdAndDelete(id);
  res.redirect('/admin');
};

app.post('/admin/api/projects', requireAuth, handleCrud(models.Project));
app.post('/admin/api/certifications', requireAuth, handleCrud(models.Certification));
app.post('/admin/api/coding-profiles', requireAuth, handleCrud(models.CodingProfile));
app.post('/admin/api/achievements', requireAuth, handleCrud(models.Achievement));

// Add script to run server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(console.error);

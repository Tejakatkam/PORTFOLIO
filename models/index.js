const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, default: 'Teja Katkam' },
  title: { type: String, default: 'AI & ML Developer' },
  introduction: { type: String, default: 'B.Tech Computer Science student specializing in Artificial Intelligence. Building intelligent systems, full-stack applications, and solving complex algorithmic challenges.' },
  about: { type: String, default: 'I am a passionate software engineering student specializing in Artificial Intelligence and Machine Learning. I enjoy building impactful solutions, ranging from full-stack web applications to computer vision systems.\n\nBeyond academics, I am actively involved in extracurriculars, serving as the Coordinator of Akriti Club (the cultural club of CMR Technical Campus) where I\'ve led events like Pegasus 2K24, Vasudiavathkam 2K24, and Anusmaran 2K24.' },
  resumeLink: { type: String, default: '#' },
  email: { type: String, default: 'tejakatkam2005@gmail.com' },
  phone: { type: String, default: '+91 9542911923' },
  github: { type: String, default: 'https://github.com/TejaKatkam' },
  linkedin: { type: String, default: 'https://linkedin.com/in/teja-katkam-26bb05246' },
  cgpa: { type: String, default: '8.87' },
  cgpaMax: { type: String, default: '10.0' }
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  image: { type: String, default: '' },
  order: { type: Number, default: 0 }
});

const SkillSchema = new mongoose.Schema({
  category: String, // e.g., 'Languages', 'Frameworks & Technologies'
  items: [String],
  order: { type: Number, default: 0 }
});

const CertificationSchema = new mongoose.Schema({
  name: String,
  issuer: String,
  date: String,
  order: { type: Number, default: 0 }
});

const CodingProfileSchema = new mongoose.Schema({
  platform: String,
  username: String,
  profileUrl: String,
  metric1Label: String,
  metric1Value: String,
  metric2Label: String,
  metric2Value: String,
  color: String,
  order: { type: Number, default: 0 }
});

const EducationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  duration: String,
  order: { type: Number, default: 0 }
});

const AchievementSchema = new mongoose.Schema({
  title: String,
  description: String,
  order: { type: Number, default: 0 }
});

module.exports = {
  Profile: mongoose.model('Profile', ProfileSchema),
  Project: mongoose.model('Project', ProjectSchema),
  Skill: mongoose.model('Skill', SkillSchema),
  Certification: mongoose.model('Certification', CertificationSchema),
  CodingProfile: mongoose.model('CodingProfile', CodingProfileSchema),
  Education: mongoose.model('Education', EducationSchema),
  Achievement: mongoose.model('Achievement', AchievementSchema)
};

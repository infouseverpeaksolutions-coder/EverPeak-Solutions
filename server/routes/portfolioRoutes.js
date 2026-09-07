const express = require('express');
const router = express.Router();
const {
  getPublicProjects,
  getProjectBySlug,
  getAdminProjects,
  getAdminProjectById,
  createProject,
  updateProject,
  deleteProject,
  togglePublish,
  toggleFeatured,
} = require('../controllers/portfolioController');
const { authenticateAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getPublicProjects);
router.get('/slug/:slug', getProjectBySlug);

// Admin protected routes
router.get('/admin/all', authenticateAdmin, getAdminProjects);
router.get('/admin/:id', authenticateAdmin, getAdminProjectById);
router.post('/', authenticateAdmin, upload.array('images', 10), createProject);
router.put('/:id', authenticateAdmin, upload.array('images', 10), updateProject);
router.delete('/:id', authenticateAdmin, deleteProject);
router.patch('/:id/publish', authenticateAdmin, togglePublish);
router.patch('/:id/featured', authenticateAdmin, toggleFeatured);

module.exports = router;

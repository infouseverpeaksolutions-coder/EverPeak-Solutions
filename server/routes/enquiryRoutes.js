const express = require('express');
const router = express.Router();
const {
  submitEnquiry,
  getAdminEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
  exportEnquiriesCSV,
  exportEnquiriesXLSX,
} = require('../controllers/enquiryController');
const { authenticateAdmin } = require('../middleware/authMiddleware');
const { enquiryLimiter } = require('../middleware/rateLimiter');

// Public route for enquiries
router.post('/', enquiryLimiter, submitEnquiry);

// Admin protected routes
router.get('/', authenticateAdmin, getAdminEnquiries);
router.get('/export/csv', authenticateAdmin, exportEnquiriesCSV);
router.get('/export/xlsx', authenticateAdmin, exportEnquiriesXLSX);
router.get('/:id', authenticateAdmin, getEnquiryById);
router.patch('/:id/status', authenticateAdmin, updateEnquiryStatus);
router.delete('/:id', authenticateAdmin, deleteEnquiry);

module.exports = router;

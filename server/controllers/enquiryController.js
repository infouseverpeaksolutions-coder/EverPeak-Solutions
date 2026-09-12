const prisma = require('../config/db');
const { sendEnquiryEmail } = require('../services/mailService');

// Public: Submit a new enquiry
const submitEnquiry = async (req, res, next) => {
  try {
    const { full_name, email, phone, city, company_name, service, budget, project_details } = req.body;

    // Strict validation
    if (!full_name || !full_name.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide your full name.' });
    }

    if (!email || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (!phone || !phone.trim() || phone.trim().length < 7) {
      return res.status(400).json({ success: false, message: 'Please provide a valid phone or WhatsApp number.' });
    }

    if (!service || !service.trim()) {
      return res.status(400).json({ success: false, message: 'Please select a service.' });
    }

    if (!project_details || !project_details.trim() || project_details.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide some project details (minimum 10 characters).',
      });
    }

    // Save to MySQL
    const enquiry = await prisma.enquiry.create({
      data: {
        full_name: full_name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        city: city ? city.trim() : null,
        company_name: company_name ? company_name.trim() : null,
        service: service.trim(),
        budget: budget ? budget.trim() : null,
        project_details: project_details.trim(),
        status: 'New',
      },
    });

    // Send email notification asynchronously
    sendEnquiryEmail(enquiry).catch((err) => {
      console.error('[Enquiry Email Hook Error]', err);
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been submitted successfully. Our team will get back to you soon.',
      enquiryId: enquiry.id,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all enquiries
const getAdminEnquiries = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 50 } = req.query;

    const where = {};
    if (status && status.toUpperCase() !== 'ALL') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { full_name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
        { city: { contains: search } },
        { company_name: { contains: search } },
        { service: { contains: search } },
      ];
    }

    const take = parseInt(limit, 10);
    const skip = (parseInt(page, 10) - 1) * take;

    const [enquiries, totalCount] = await Promise.all([
      prisma.enquiry.findMany({
        where,
        orderBy: { created_at: 'desc' },
        take,
        skip,
      }),
      prisma.enquiry.count({ where }),
    ]);

    return res.status(200).json({
      success: true,
      total: totalCount,
      page: parseInt(page, 10),
      totalPages: Math.ceil(totalCount / take),
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get single enquiry
const getEnquiryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enquiry = await prisma.enquiry.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }

    return res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};

// Admin: Update enquiry status
const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['New', 'Contacted', 'In Progress', 'Converted', 'Closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${validStatuses.join(', ')}`,
      });
    }

    const updated = await prisma.enquiry.update({
      where: { id: parseInt(id, 10) },
      data: { status },
    });

    return res.status(200).json({
      success: true,
      message: 'Enquiry status updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Delete enquiry
const deleteEnquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.enquiry.delete({
      where: { id: parseInt(id, 10) },
    });

    return res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Export enquiries as CSV/Excel spreadsheet
const exportEnquiriesCSV = async (req, res, next) => {
  try {
    const { status, search } = req.query;

    const where = {};
    if (status && status.toUpperCase() !== 'ALL') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { full_name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
        { city: { contains: search } },
        { company_name: { contains: search } },
        { service: { contains: search } },
      ];
    }

    const enquiries = await prisma.enquiry.findMany({
      where,
      orderBy: { created_at: 'desc' },
    });

    // Helper to escape CSV cell values
    const escapeCSV = (val) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const headers = [
      'Enquiry ID',
      'Date & Time (IST)',
      'Full Name',
      'Email Address',
      'Phone / WhatsApp',
      'City / Location',
      'Company Name',
      'Service Requested',
      'Estimated Budget',
      'Status',
      'Project Details / Message',
    ];

    const rows = enquiries.map((item) => {
      const dateStr = new Date(item.created_at).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      return [
        escapeCSV(item.id),
        escapeCSV(dateStr),
        escapeCSV(item.full_name),
        escapeCSV(item.email),
        escapeCSV(item.phone),
        escapeCSV(item.city || 'N/A'),
        escapeCSV(item.company_name || 'N/A'),
        escapeCSV(item.service),
        escapeCSV(item.budget || 'N/A'),
        escapeCSV(item.status),
        escapeCSV(item.project_details),
      ].join(',');
    });

    const csvData = [headers.join(','), ...rows].join('\r\n');
    const filename = `EverPeak_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    // UTF-8 BOM so Excel opens Hindi, special characters, and numbers without formatting issues
    return res.status(200).send('\uFEFF' + csvData);
  } catch (error) {
    next(error);
  }
};

// Admin: Export enquiries as real Excel .xlsx spreadsheet
const exportEnquiriesXLSX = async (req, res, next) => {
  try {
    const ExcelJS = require('exceljs');
    const { status, search } = req.query;

    const where = {};
    if (status && status.toUpperCase() !== 'ALL') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { full_name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
        { city: { contains: search } },
        { company_name: { contains: search } },
        { service: { contains: search } },
      ];
    }

    const enquiries = await prisma.enquiry.findMany({
      where,
      orderBy: { created_at: 'desc' },
    });

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'EverPeak Solutions';
    workbook.created = new Date();

    const sheet = workbook.addWorksheet('Leads', {
      views: [{ state: 'frozen', ySplit: 1 }],
    });

    sheet.columns = [
      { header: 'Enquiry ID', key: 'id', width: 14 },
      { header: 'Date & Time (IST)', key: 'date', width: 22 },
      { header: 'Full Name', key: 'full_name', width: 26 },
      { header: 'Email Address', key: 'email', width: 30 },
      { header: 'Phone / WhatsApp', key: 'phone', width: 20 },
      { header: 'City / Location', key: 'city', width: 18 },
      { header: 'Company Name', key: 'company_name', width: 24 },
      { header: 'Service Requested', key: 'service', width: 26 },
      { header: 'Estimated Budget', key: 'budget', width: 18 },
      { header: 'Status', key: 'status', width: 16 },
      { header: 'Project Details / Message', key: 'project_details', width: 45 },
    ];

    // Bold header row + subtle background fill
    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF121216' },
    };
    headerRow.height = 28;
    headerRow.alignment = { vertical: 'middle' };

    // Auto-filter across all columns
    sheet.autoFilter = 'A1:K1';

    // Add rows
    enquiries.forEach((item) => {
      const dateStr = new Date(item.created_at).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      const row = sheet.addRow({
        id: item.id,
        date: dateStr,
        full_name: item.full_name,
        email: item.email,
        phone: item.phone,
        city: item.city || 'N/A',
        company_name: item.company_name || 'N/A',
        service: item.service,
        budget: item.budget || 'N/A',
        status: item.status,
        project_details: item.project_details,
      });

      row.alignment = { vertical: 'middle', wrapText: false };
      row.height = 22;
    });

    const filename = `EverPeak_Enquiries_${new Date().toISOString().slice(0, 10)}.xlsx`;

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitEnquiry,
  getAdminEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
  exportEnquiriesCSV,
  exportEnquiriesXLSX,
};

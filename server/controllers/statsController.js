const prisma = require('../config/db');

// Admin: Get dashboard overview stats
const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProjects,
      publishedProjects,
      featuredProjects,
      totalEnquiries,
      newEnquiries,
      contactedEnquiries,
      convertedEnquiries,
      inProgressEnquiries,
      closedEnquiries,
      recentEnquiries,
    ] = await Promise.all([
      prisma.portfolioProject.count(),
      prisma.portfolioProject.count({ where: { published: true } }),
      prisma.portfolioProject.count({ where: { featured: true } }),
      prisma.enquiry.count(),
      prisma.enquiry.count({ where: { status: 'New' } }),
      prisma.enquiry.count({ where: { status: 'Contacted' } }),
      prisma.enquiry.count({ where: { status: 'Converted' } }),
      prisma.enquiry.count({ where: { status: 'In Progress' } }),
      prisma.enquiry.count({ where: { status: 'Closed' } }),
      prisma.enquiry.findMany({
        take: 6,
        orderBy: { created_at: 'desc' },
      }),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        projects: {
          total: totalProjects,
          published: publishedProjects,
          featured: featuredProjects,
          drafts: totalProjects - publishedProjects,
        },
        enquiries: {
          total: totalEnquiries,
          new: newEnquiries,
          contacted: contactedEnquiries,
          converted: convertedEnquiries,
          inProgress: inProgressEnquiries,
          closed: closedEnquiries,
        },
        recentEnquiries,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardStats };

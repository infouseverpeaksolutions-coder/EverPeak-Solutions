const fs = require('fs');
const path = require('path');
const prisma = require('../config/db');

// Helper to generate a slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Public: Get all published portfolio projects
const getPublicProjects = async (req, res, next) => {
  try {
    const { category, featured, search } = req.query;

    const where = {
      published: true,
    };

    if (category && category.toUpperCase() !== 'ALL') {
      where.category = {
        equals: category,
      };
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { short_description: { contains: search } },
        { category: { contains: search } },
      ];
    }

    const projects = await prisma.portfolioProject.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { created_at: 'desc' },
      ],
      include: {
        images: {
          orderBy: { sort_order: 'asc' },
        },
      },
    });

    // Parse JSON/text fields if needed
    const formattedProjects = projects.map((p) => ({
      ...p,
      services: p.services ? (typeof p.services === 'string' && p.services.startsWith('[') ? JSON.parse(p.services) : p.services.split(',').map((s) => s.trim())) : [],
      technologies: p.technologies ? (typeof p.technologies === 'string' && p.technologies.startsWith('[') ? JSON.parse(p.technologies) : p.technologies.split(',').map((t) => t.trim())) : [],
    }));

    return res.status(200).json({
      success: true,
      count: formattedProjects.length,
      data: formattedProjects,
    });
  } catch (error) {
    next(error);
  }
};

// Public: Get single project by slug
const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const project = await prisma.portfolioProject.findFirst({
      where: {
        slug: slug.toLowerCase(),
        published: true,
      },
      include: {
        images: {
          orderBy: { sort_order: 'asc' },
        },
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio project not found or not currently published.',
      });
    }

    const formattedProject = {
      ...project,
      services: project.services ? (typeof project.services === 'string' && project.services.startsWith('[') ? JSON.parse(project.services) : project.services.split(',').map((s) => s.trim())) : [],
      technologies: project.technologies ? (typeof project.technologies === 'string' && project.technologies.startsWith('[') ? JSON.parse(project.technologies) : project.technologies.split(',').map((t) => t.trim())) : [],
    };

    // Also get related projects in same category
    const relatedProjects = await prisma.portfolioProject.findMany({
      where: {
        category: project.category,
        published: true,
        id: { not: project.id },
      },
      take: 3,
      orderBy: { created_at: 'desc' },
      include: {
        images: {
          take: 1,
          orderBy: { sort_order: 'asc' },
        },
      },
    });

    return res.status(200).json({
      success: true,
      data: formattedProject,
      related: relatedProjects,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all projects (published & drafts)
const getAdminProjects = async (req, res, next) => {
  try {
    const { category, status, search } = req.query;

    const where = {};

    if (category && category.toUpperCase() !== 'ALL') {
      where.category = category;
    }

    if (status === 'published') {
      where.published = true;
    } else if (status === 'draft') {
      where.published = false;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { short_description: { contains: search } },
        { category: { contains: search } },
      ];
    }

    const projects = await prisma.portfolioProject.findMany({
      where,
      orderBy: { created_at: 'desc' },
      include: {
        images: {
          orderBy: { sort_order: 'asc' },
        },
      },
    });

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get single project by ID
const getAdminProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await prisma.portfolioProject.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        images: {
          orderBy: { sort_order: 'asc' },
        },
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Create new project
const createProject = async (req, res, next) => {
  try {
    const {
      title,
      slug: customSlug,
      category,
      short_description,
      description,
      challenge,
      solution,
      services,
      technologies,
      project_url,
      featured,
      published,
    } = req.body;

    if (!title || !category || !short_description || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, short description, and full description are required.',
      });
    }

    let finalSlug = slugify(customSlug || title);
    // Check slug collision
    const existing = await prisma.portfolioProject.findUnique({ where: { slug: finalSlug } });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    // Format services and technologies
    const formattedServices = Array.isArray(services) ? JSON.stringify(services) : (services || '');
    const formattedTechnologies = Array.isArray(technologies) ? JSON.stringify(technologies) : (technologies || '');

    const project = await prisma.portfolioProject.create({
      data: {
        title: title.trim(),
        slug: finalSlug,
        category: category.trim(),
        short_description: short_description.trim(),
        description: description.trim(),
        challenge: challenge ? challenge.trim() : null,
        solution: solution ? solution.trim() : null,
        services: formattedServices,
        technologies: formattedTechnologies,
        project_url: project_url ? project_url.trim() : null,
        featured: featured === true || featured === 'true',
        published: published === true || published === 'true',
      },
    });

    // Process uploaded files if any
    if (req.files && req.files.length > 0) {
      const imageRecords = req.files.map((file, idx) => ({
        project_id: project.id,
        image_url: `/uploads/${file.filename}`,
        image_type: idx === 0 ? 'thumbnail' : 'screenshot',
        sort_order: idx,
      }));

      await prisma.portfolioImage.createMany({
        data: imageRecords,
      });
    }

    const completeProject = await prisma.portfolioProject.findUnique({
      where: { id: project.id },
      include: { images: { orderBy: { sort_order: 'asc' } } },
    });

    return res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: completeProject,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update existing project
const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const projectId = parseInt(id, 10);

    const existingProject = await prisma.portfolioProject.findUnique({
      where: { id: projectId },
      include: { images: true },
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    const {
      title,
      slug: customSlug,
      category,
      short_description,
      description,
      challenge,
      solution,
      services,
      technologies,
      project_url,
      featured,
      published,
      deleted_image_ids,
    } = req.body;

    const updateData = {};
    if (title) updateData.title = title.trim();
    if (category) updateData.category = category.trim();
    if (short_description) updateData.short_description = short_description.trim();
    if (description) updateData.description = description.trim();
    if (challenge !== undefined) updateData.challenge = challenge ? challenge.trim() : null;
    if (solution !== undefined) updateData.solution = solution ? solution.trim() : null;
    if (project_url !== undefined) updateData.project_url = project_url ? project_url.trim() : null;
    if (featured !== undefined) updateData.featured = featured === true || featured === 'true';
    if (published !== undefined) updateData.published = published === true || published === 'true';

    if (services !== undefined) {
      updateData.services = Array.isArray(services) ? JSON.stringify(services) : services;
    }
    if (technologies !== undefined) {
      updateData.technologies = Array.isArray(technologies) ? JSON.stringify(technologies) : technologies;
    }

    if (customSlug && customSlug !== existingProject.slug) {
      let finalSlug = slugify(customSlug);
      const slugCheck = await prisma.portfolioProject.findFirst({
        where: { slug: finalSlug, id: { not: projectId } },
      });
      if (slugCheck) {
        finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
      }
      updateData.slug = finalSlug;
    }

    // Handle deleted images
    if (deleted_image_ids) {
      const idsToDelete = (Array.isArray(deleted_image_ids) ? deleted_image_ids : [deleted_image_ids])
        .map((imgId) => parseInt(imgId, 10))
        .filter(Boolean);

      if (idsToDelete.length > 0) {
        const imagesToDelete = await prisma.portfolioImage.findMany({
          where: { id: { in: idsToDelete }, project_id: projectId },
        });

        for (const img of imagesToDelete) {
          if (img.image_url.startsWith('/uploads/')) {
            const filePath = path.join(__dirname, '..', img.image_url);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
        }

        await prisma.portfolioImage.deleteMany({
          where: { id: { in: idsToDelete } },
        });
      }
    }

    // Handle new uploaded images
    if (req.files && req.files.length > 0) {
      const currentImageCount = await prisma.portfolioImage.count({
        where: { project_id: projectId },
      });

      const newImages = req.files.map((file, idx) => ({
        project_id: projectId,
        image_url: `/uploads/${file.filename}`,
        image_type: currentImageCount === 0 && idx === 0 ? 'thumbnail' : 'screenshot',
        sort_order: currentImageCount + idx,
      }));

      await prisma.portfolioImage.createMany({
        data: newImages,
      });
    }

    const updated = await prisma.portfolioProject.update({
      where: { id: projectId },
      data: updateData,
      include: {
        images: { orderBy: { sort_order: 'asc' } },
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Delete project
const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const projectId = parseInt(id, 10);

    const project = await prisma.portfolioProject.findUnique({
      where: { id: projectId },
      include: { images: true },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    // Delete local files
    for (const img of project.images) {
      if (img.image_url.startsWith('/uploads/')) {
        const filePath = path.join(__dirname, '..', img.image_url);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    await prisma.portfolioProject.delete({
      where: { id: projectId },
    });

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Toggle publish
const togglePublish = async (req, res, next) => {
  try {
    const { id } = req.params;
    const projectId = parseInt(id, 10);

    const project = await prisma.portfolioProject.findUnique({ where: { id: projectId } });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    const updated = await prisma.portfolioProject.update({
      where: { id: projectId },
      data: { published: !project.published },
    });

    return res.status(200).json({
      success: true,
      message: `Project ${updated.published ? 'published' : 'unpublished'} successfully.`,
      published: updated.published,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Toggle featured
const toggleFeatured = async (req, res, next) => {
  try {
    const { id } = req.params;
    const projectId = parseInt(id, 10);

    const project = await prisma.portfolioProject.findUnique({ where: { id: projectId } });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    const updated = await prisma.portfolioProject.update({
      where: { id: projectId },
      data: { featured: !project.featured },
    });

    return res.status(200).json({
      success: true,
      message: `Project ${updated.featured ? 'marked as featured' : 'unmarked from featured'}.`,
      featured: updated.featured,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublicProjects,
  getProjectBySlug,
  getAdminProjects,
  getAdminProjectById,
  createProject,
  updateProject,
  deleteProject,
  togglePublish,
  toggleFeatured,
};

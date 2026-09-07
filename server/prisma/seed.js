require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting EverPeak Solutions Database Seeding...');

  // 1. Create or update Default Admin
  const adminEmail = 'admin@everpeaksolutions.in';
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash('EverPeak@Admin2026!', salt);

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {
      password_hash: passwordHash,
      name: 'EverPeak Administrator',
    },
    create: {
      name: 'EverPeak Administrator',
      email: adminEmail,
      password_hash: passwordHash,
    },
  });

  console.log(`✅ Admin account seeded: ${admin.email} (Password: EverPeak@Admin2026!)`);

  // 2. Seed Portfolio Projects
  const initialProjects = [
    {
      title: 'Devangi Vastra — Luxury Ethnic E-Commerce Experience',
      slug: 'devangi-vastra-luxury-ethnic-ecommerce',
      category: 'E-COMMERCE',
      short_description: 'A high-converting, lightning-fast digital storefront with bespoke catalog filtering, automated inventory sync, and localized checkout.',
      description: 'Devangi Vastra required an elegant, high-performance e-commerce platform to showcase luxury handcrafted apparel. EverPeak Solutions engineered an ultra-responsive storefront with seamless navigation, optimized mobile checkout flow, high-resolution visual storytelling, and instant payment gateway integrations.',
      challenge: 'The client faced high cart abandonment and slow page load times on mobile devices, impacting revenue during seasonal festive promotions.',
      solution: 'We revamped the architecture with modern performance optimizations, streamlined 1-click checkout, automated order tracking, and integrated CRM workflows for automated abandoned cart recovery.',
      services: JSON.stringify(['Custom E-Commerce', 'UI/UX Design', 'Payment Gateway Integration', 'Performance Optimization', 'SEO Audit']),
      technologies: JSON.stringify(['Shopify Plus', 'React.js', 'TailwindCSS', 'Razorpay', 'Google Analytics 4']),
      project_url: 'https://devangivastra.com/',
      featured: true,
      published: true,
      images: [
        {
          image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
          image_type: 'thumbnail',
          sort_order: 0,
        },
        {
          image_url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
          image_type: 'screenshot',
          sort_order: 1,
        }
      ],
    },
    {
      title: 'Paymitra — Next-Gen B2B Digital Payments & Financial Platform',
      slug: 'paymitra-b2b-digital-payments-platform',
      category: 'IT & DEVELOPMENT',
      short_description: 'An enterprise-grade fintech application providing instant merchant settlements, real-time transaction ledgering, and resilient REST APIs.',
      description: 'Paymitra bridges small merchants and digital payment ecosystems through a secure, high-throughput financial web application and mobile API backend. Built with bank-grade security, multi-factor authentication, and robust audit trails.',
      challenge: 'Handling concurrent transaction webhooks and settlement calculations under high volume without race conditions or downtime.',
      solution: 'EverPeak designed an asynchronous queue-based micro-service backend with MySQL transactional isolation, instant ledger updates, and an intuitive merchant dashboard.',
      services: JSON.stringify(['Custom Software Development', 'REST API Architecture', 'Database Engineering', 'Fintech Security Audit']),
      technologies: JSON.stringify(['Node.js', 'Express.js', 'MySQL', 'Redis', 'React.js', 'JWT', 'TailwindCSS']),
      project_url: 'https://paymitra.app/',
      featured: true,
      published: true,
      images: [
        {
          image_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
          image_type: 'thumbnail',
          sort_order: 0,
        },
        {
          image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
          image_type: 'screenshot',
          sort_order: 1,
        }
      ],
    },
    {
      title: 'Billistry — Modern Cloud Invoicing & Billing SaaS Platform',
      slug: 'billistry-cloud-invoicing-saas-platform',
      category: 'IT & DEVELOPMENT',
      short_description: 'All-in-one cloud billing software enabling automated GST invoicing, recurring billing, client portals, and multi-currency reporting.',
      description: 'Billistry streamlines accounting workflows for growing SMBs and agencies. We built the complete SaaS frontend and backend architecture, including dynamic invoice generation, tax calculations, payment status webhooks, and granular user roles.',
      challenge: 'Complex tax rules, multi-user permissions, and PDF invoice generation without slowing down user interactions.',
      solution: 'Implemented client-side reactive invoice builders with background PDF generation pipelines and unified dashboard metrics.',
      services: JSON.stringify(['SaaS Development', 'Web Application Development', 'UI/UX Prototyping', 'Cloud Architecture']),
      technologies: JSON.stringify(['React', 'Node.js', 'Express', 'MySQL', 'Prisma ORM', 'TailwindCSS']),
      project_url: 'https://www.billistry.com/',
      featured: true,
      published: true,
      images: [
        {
          image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
          image_type: 'thumbnail',
          sort_order: 0,
        }
      ],
    },
    {
      title: 'JeevanShaadi — High-Performance Matrimonial & Matchmaking Portal',
      slug: 'jeevanshaadi-matrimonial-matchmaking-portal',
      category: 'IT & DEVELOPMENT',
      short_description: 'A trusted matrimonial platform featuring smart matchmaking algorithms, verified profile onboarding, and secure real-time messaging.',
      description: 'JeevanShaadi connects prospective brides and grooms through intelligent preference matching, strict verification tiers, interactive search filters, and privacy controls.',
      challenge: 'Managing extensive member profiles, high-resolution photo galleries, and real-time interest requests at scale.',
      solution: 'Engineered a lightning-fast MySQL indexed query architecture with instant notifications and modern responsive mobile UI.',
      services: JSON.stringify(['Full-Stack Web Development', 'Mobile Optimization', 'Search & Filtering Systems', 'Database Optimization']),
      technologies: JSON.stringify(['React.js', 'Node.js', 'Express', 'MySQL', 'TailwindCSS']),
      project_url: 'https://jeevanshaadi.com/',
      featured: false,
      published: true,
      images: [
        {
          image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
          image_type: 'thumbnail',
          sort_order: 0,
        }
      ],
    },
    {
      title: 'Edmirai — Comprehensive Global EdTech & Education Portal',
      slug: 'edmirai-global-edtech-learning-portal',
      category: 'IT & DEVELOPMENT',
      short_description: 'An interactive education portal empowering students with global university matching, career guidance, and course enrollment.',
      description: 'Edmirai simplifies the study-abroad and career guidance journey for thousands of aspiring students through intuitive program finders, counselor consultation booking, and admissions tracking.',
      challenge: 'Structuring hundreds of universities, requirements, and multi-step intake funnels into an easy-to-use interface.',
      solution: 'Developed dynamic search filters, intake calculators, and lead management CRM integrations.',
      services: JSON.stringify(['Web Platform Development', 'Lead Management Funnels', 'UI/UX Design', 'SEO Optimization']),
      technologies: JSON.stringify(['React', 'Node.js', 'MySQL', 'TailwindCSS', 'Meta Pixel']),
      project_url: 'https://edmirai.com/',
      featured: false,
      published: true,
      images: [
        {
          image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
          image_type: 'thumbnail',
          sort_order: 0,
        }
      ],
    },
    {
      title: 'High-Impact Meta & Google Ads Scaling — 4.5x ROAS & 500+ Leads',
      slug: 'performance-marketing-meta-google-ads-scaling',
      category: 'DIGITAL MARKETING',
      short_description: 'Precision-targeted performance marketing campaigns driving record return on ad spend (ROAS) and lowering cost-per-lead for high-growth brands.',
      description: 'EverPeak executed data-driven paid advertising funnels across Meta (Facebook & Instagram) and Google Ads for leading retail and real estate brands. Utilizing custom creative A/B testing, pixel conversion tracking, and retargeting loops.',
      challenge: 'High cost per acquisition and ad fatigue on traditional campaigns.',
      solution: 'Re-architected the entire audience funnel with dynamic product ads, localized intent-based copy, and automated bidding algorithms, yielding a 4.5x ROAS and dropping CPL to ₹2.5 - ₹10.',
      services: JSON.stringify(['Performance Marketing', 'Google Ads', 'Meta Ads', 'Conversion Rate Optimization', 'Creative Strategy']),
      technologies: JSON.stringify(['Meta Ads Manager', 'Google Ads', 'Google Tag Manager', 'GA4', 'Conversion API']),
      project_url: 'https://everpeaksolutions.in',
      featured: true,
      published: true,
      images: [
        {
          image_url: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1200&q=80',
          image_type: 'thumbnail',
          sort_order: 0,
        }
      ],
    },
    {
      title: 'Omni-Channel Social Media & Brand Growth Campaign',
      slug: 'social-media-management-community-growth',
      category: 'DIGITAL MARKETING',
      short_description: '150% organic social media growth and viral brand engagement across Instagram, Facebook, and LinkedIn within 90 days.',
      description: 'End-to-end creative social media strategy including content calendars, motion graphic reels, community management, and influencer collaborations for emerging lifestyle and retail enterprises.',
      challenge: 'Low organic reach and stagnant brand visibility among Gen Z and millennial target demographics.',
      solution: 'Created a cohesive visual identity, high-tempo reels strategy, and interactive community polls, driving a 150% boost in active followers and qualified inbound DMs.',
      services: JSON.stringify(['Social Media Marketing', 'Content Strategy', 'Brand Storytelling', 'Community Management']),
      technologies: JSON.stringify(['Instagram', 'Meta Business Suite', 'Canva Pro', 'Adobe After Effects', 'Buffer']),
      project_url: 'https://everpeaksolutions.in',
      featured: false,
      published: true,
      images: [
        {
          image_url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
          image_type: 'thumbnail',
          sort_order: 0,
        }
      ],
    },
    {
      title: 'Fashcycle & NovaSathi — Futuristic Mobile & Web Design System',
      slug: 'fashcycle-novasathi-ui-ux-design-system',
      category: 'UI/UX DESIGN',
      short_description: 'A modular, dark-mode design system and cross-platform UI/UX architecture created for high-engagement mobile applications.',
      description: 'We crafted a comprehensive UI/UX experience and component design system for next-generation circular fashion and community platforms. Built with fluid micro-interactions, ergonomic mobile gestures, and WCAG AA accessibility compliance.',
      challenge: 'Creating a seamless bridge between complex marketplace mechanics and an effortless consumer shopping flow.',
      solution: 'Designed 60+ interactive screens in Figma with component tokens, motion guidelines, and interactive clickable prototypes.',
      services: JSON.stringify(['UI/UX Design', 'Design Systems', 'Mobile App Prototyping', 'User Research & Wireframing']),
      technologies: JSON.stringify(['Figma', 'Adobe XD', 'Protopie', 'Design Tokens', 'Tailwind UI']),
      project_url: 'https://novasathi.in/',
      featured: true,
      published: true,
      images: [
        {
          image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
          image_type: 'thumbnail',
          sort_order: 0,
        }
      ],
    },
    {
      title: 'Vanya River Resort & Eco Tourism Brand Identity & Web Portal',
      slug: 'vanya-river-resort-brand-identity-web-portal',
      category: 'BRANDING',
      short_description: 'Complete luxury brand identity, visual storytelling, and direct booking engine for a premier wilderness resort.',
      description: 'EverPeak Solutions engineered an immersive web portal and complete luxury brand identity for Vanya River Resort, elevating customer engagement and capturing direct commission-free reservations.',
      challenge: 'Heavy reliance on third-party OTAs with high commission deductions and inconsistent brand imagery.',
      solution: 'Delivered an experiential visual portal with virtual room tours, localized SEO, fast mobile booking flow, and integrated WhatsApp concierge.',
      services: JSON.stringify(['Brand Identity', 'Website Development', 'Local SEO', 'Booking Engine Integration']),
      technologies: JSON.stringify(['React.js', 'TailwindCSS', 'Node.js', 'Google Maps API', 'WhatsApp Business API']),
      project_url: 'https://vanyariverresort.com/',
      featured: false,
      published: true,
      images: [
        {
          image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
          image_type: 'thumbnail',
          sort_order: 0,
        }
      ],
    }
  ];

  for (const projData of initialProjects) {
    const { images, ...projectFields } = projData;
    const existing = await prisma.portfolioProject.findUnique({
      where: { slug: projectFields.slug },
    });

    if (!existing) {
      const createdProj = await prisma.portfolioProject.create({
        data: {
          ...projectFields,
          images: {
            create: images.map((img) => ({
              image_url: img.image_url,
              image_type: img.image_type,
              sort_order: img.sort_order,
            })),
          },
        },
      });
      console.log(`✅ Seeded Project: ${createdProj.title}`);
    } else {
      console.log(`ℹ️ Project already exists: ${projectFields.title}`);
    }
  }

  // 3. Seed Sample Enquiries for testing admin dashboard
  const sampleEnquiries = [
    {
      full_name: 'Rahul Sharma',
      email: 'rahul.sharma@techcorp.in',
      phone: '+91 98260 12345',
      company_name: 'TechCorp Solutions',
      service: 'Custom Software Development',
      budget: '₹1,00,000 – ₹2,00,000',
      project_details: 'We are looking to develop a customized ERP and workflow automation system for our logistics business with real-time tracking.',
      status: 'New',
    },
    {
      full_name: 'Pooja Verma',
      email: 'pooja@boutiqueindia.com',
      phone: '+91 98930 54321',
      company_name: 'Vastra Boutique',
      service: 'E-Commerce Development',
      budget: '₹50,000 – ₹1,00,000',
      project_details: 'Need a modern Shopify / custom React e-commerce store with Instagram shop integration and fast checkout.',
      status: 'Contacted',
    },
    {
      full_name: 'Amit Patel',
      email: 'amit@patelrealty.com',
      phone: '+91 94250 88776',
      company_name: 'Patel Realty Group',
      service: 'Google Ads & Meta Ads',
      budget: '₹50,000 – ₹1,00,000',
      project_details: 'Looking for a dedicated digital marketing agency to run targeted lead generation campaigns for our upcoming luxury township project.',
      status: 'In Progress',
    }
  ];

  for (const enq of sampleEnquiries) {
    const existing = await prisma.enquiry.findFirst({
      where: { email: enq.email },
    });
    if (!existing) {
      await prisma.enquiry.create({ data: enq });
    }
  }
  console.log('✅ Seeded sample enquiries.');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

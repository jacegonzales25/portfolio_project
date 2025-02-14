import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedTechnologyCategories() {
  const categoryNames = [
    "Cloud Platforms",
    "Containerization & Orchestration",
    "Infrastructure as Code (IaC)",
    "CI/CD & Automation",
    "Scripting & Automation",
    "Frontend Development",
    "Backend Development",
    "Databases",
    "Caching",
    "Version Control & Collaboration",
    "Hosting & Domain Management",
    "Operating Systems",
    "Web Technologies",
  ];

  await prisma.technologyCategory.createMany({
    data: categoryNames.map((name) => ({ name })),
    skipDuplicates: true,
  });

  console.log("Technology categories seeded.");
  return await prisma.technologyCategory.findMany();
}

async function seedTechnologies(categories: { name: string; id: number }[]) {
  const categoryMap = Object.fromEntries(categories.map((c) => [c.name, c.id]));

  const technologies = [
    { name: "AWS (EC2, S3, RDS, EKS, Elastic Beanstalk, CloudFront)", category: "Cloud Platforms" },
    { name: "Docker", category: "Containerization & Orchestration" },
    { name: "Kubernetes (EKS)", category: "Containerization & Orchestration" },
    { name: "Terraform", category: "Infrastructure as Code (IaC)" },
    { name: "Ansible", category: "Infrastructure as Code (IaC)" },
    { name: "AWS CodePipeline", category: "CI/CD & Automation" },
    { name: "AWS CodeBuild", category: "CI/CD & Automation" },
    { name: "GitHub Actions", category: "CI/CD & Automation" },
    { name: "Jenkins", category: "CI/CD & Automation" },
    { name: "Python", category: "Scripting & Automation" },
    { name: "Bash", category: "Scripting & Automation" },
    { name: "React (Next.js)", category: "Frontend Development" },
    { name: "Flutter", category: "Frontend Development" },
    { name: "HTML", category: "Web Technologies" },
    { name: "CSS", category: "Web Technologies" },
    { name: "JavaScript (TypeScript)", category: "Web Technologies" },
    { name: "Node.js (Express, TypeScript)", category: "Backend Development" },
    { name: "Python", category: "Backend Development" },
    { name: "Java", category: "Backend Development" },
    { name: "PHP", category: "Backend Development" },
    { name: "PostgreSQL (Drizzle, Prisma)", category: "Databases" },
    { name: "MySQL", category: "Databases" },
    { name: "MongoDB", category: "Databases" },
    { name: "Firebase", category: "Databases" },
    { name: "Redis", category: "Caching" },
    { name: "AWS ElastiCache", category: "Caching" },
    { name: "Git", category: "Version Control & Collaboration" },
    { name: "GitHub", category: "Version Control & Collaboration" },
    { name: "AWS", category: "Hosting & Domain Management" },
    { name: "GoDaddy", category: "Hosting & Domain Management" },
    { name: "Linux", category: "Operating Systems" },
  ];

  await prisma.technology.createMany({
    data: technologies.map((tech) => ({
      name: tech.name,
      categoryId: categoryMap[tech.category],
    })),
    skipDuplicates: true,
  });

  console.log("Technologies seeded.");
}

async function seedExperiences() {
  const experiences = [
    {
      company: "Highly Succeed Inc",
      title: "Web Development Intern",
      startDate: new Date("2023-06-01"),
      endDate: new Date("2023-08-31"),
      current: false,
      responsibilities: {
        tasks: [
          "Engineered a custom AI chatbot using the React tech stack, enhancing user interaction and support.",
          "Developed backend solutions for an internal financial payroll system, streamlining operations and ensuring data integrity.",
        ],
      },
    },
  ];

  await prisma.experience.createMany({ data: experiences, skipDuplicates: true });
  console.log("Experiences seeded.");
}

async function seedProjects() {
  // First, get the technology IDs we need
  const technologies = await prisma.technology.findMany();
  const techMap = new Map(technologies.map(tech => [tech.name, tech.id]));

  const projects = [
    {
      title: "Resume Portfolio",
      description: "A containerized portfolio showcasing my technical skills and projects.",
      image: "https://resume-portfolio-assets.s3.us-east-1.amazonaws.com/uploads/photos/resume.png",
      githubLink: "https://github.com/jacegonzales25/portfolio_project",
      externalLink: "https://jacegonzales.cloudifyops.xyz",
      technologies: {
        connect: [
          "Docker",
          "Kubernetes (EKS)",
          "AWS (EC2, S3, RDS, EKS, Elastic Beanstalk, CloudFront)",
          "React (Next.js)",
          "Redis",
          "Node.js (Express, TypeScript)",
          "PostgreSQL (Drizzle, Prisma)",
          "GitHub Actions",
          "Terraform"
        ].map(techName => ({
          id: techMap.get(techName)
        })).filter(tech => tech.id !== undefined)
      },
    },
    {
      title: "Multi-tier Web Application Stack (VPROFILE)",
      description: "A full-stack web app deployed using AWS, achieving significant cost and efficiency improvements.",
      image: "https://resume-portfolio-assets.s3.us-east-1.amazonaws.com/uploads/photos/vprofile-cloudifyops.png",
      githubLink: "https://github.com/jacegonzales25/devops/tree/aws-rearch",
      externalLink: "https://vprofile.cloudifyops.xyz",
      technologies: {
        connect: [
          "AWS (EC2, S3, RDS, EKS, Elastic Beanstalk, CloudFront)",
          "AWS ElastiCache",
          "Terraform"
        ].map(techName => ({
          id: techMap.get(techName)
        })).filter(tech => tech.id !== undefined)
      },
    },
    {
      title: "Job App Helper",
      description: "A frontend-only job application assistant tool built with Next.js and Redux for state management.",
      image: "https://resume-portfolio-assets.s3.us-east-1.amazonaws.com/uploads/photos/job-app-helper-vercel.png",
      githubLink: "https://github.com/jacegonzales25/job-app-helper",
      externalLink: "https://job-app-helper.vercel.app",
      technologies: {
        connect: [
          "React (Next.js)"
        ].map(techName => ({
          id: techMap.get(techName)
        })).filter(tech => tech.id !== undefined)
      },
    },
  ];

  for (const project of projects) {
    await prisma.project.create({
      data: project,
    });
  }

  console.log("Projects seeded.");
}

async function main() {
  try {
    console.log("Seeding database...");

    const categories = await seedTechnologyCategories();
    await seedTechnologies(categories);
    await seedExperiences();
    await seedProjects();

    console.log("Database successfully seeded! 🚀");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
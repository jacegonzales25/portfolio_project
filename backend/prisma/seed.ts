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
    "Operating Systems"
  ];

  const categories = await prisma.$transaction(
    categoryNames.map((name) =>
      prisma.technologyCategory.create({ data: { name } })
    )
  );

  console.log("Technology categories seeded.");
  return categories;
}

async function seedTechnologies(categories: { name: string; id: number }[]) {
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
    { name: "HTML", category: "Frontend Development" },
    { name: "CSS", category: "Frontend Development" },
    { name: "JavaScript (TypeScript)", category: "Frontend Development" },
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
    { name: "Linux", category: "Operating Systems" }
  ];

  const categoryMap = Object.fromEntries(
    categories.map((c) => [c.name, c.id])
  );

  await prisma.$transaction(
    technologies.map((tech) =>
      prisma.technology.create({
        data: {
          name: tech.name,
          categoryId: categoryMap[tech.category],
        },
      })
    )
  );

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

  await prisma.experience.createMany({ data: experiences });
  console.log("Experiences seeded.");
}

async function seedProjects() {
  const technologyNames = [
    "Docker",
    "Docker Compose",
    "AWS (ECR, Elastic Beanstalk, RDS, S3, Route53 for GoDaddy)",
    "Next.js (Frontend)",
    "Redis (Cache)",
    "Express (Backend)",
    "PostgreSQL (Database)",
    "GitHub Actions (CI/CD)",
    "AWS Elastic Beanstalk (Tomcat, NGINX)",
    "RDS",
    "S3/EFS",
    "ElastiCache",
    "Active MQ",
    "Route53",
    "Cloudfront",
    "Terraform",
    "Redux (State Management)",
  ];

  const technologies = await prisma.technology.findMany({
    where: { name: { in: technologyNames } },
  });

  const technologyMap = Object.fromEntries(
    technologies.map((t) => [t.name, t.id])
  );

  const projects = [
    {
      title: "Resume Portfolio",
      description:
        "A containerized portfolio showcasing my technical skills and projects.",
      githubLink: "https://github.com/jacegonzales/resume-portfolio",
      externalLink: "https://jacegonzales.cloudifyops.xyz",
      technologies: {
        connect: [
          { id: technologyMap["Docker"] },
          { id: technologyMap["Docker Compose"] },
          {
            id: technologyMap[
              "AWS (ECR, Elastic Beanstalk, RDS, S3, Route53 for GoDaddy)"
            ],
          },
          { id: technologyMap["Next.js (Frontend)"] },
          { id: technologyMap["Redis (Cache)"] },
          { id: technologyMap["Express (Backend)"] },
          { id: technologyMap["PostgreSQL (Database)"] },
          { id: technologyMap["GitHub Actions (CI/CD)"] },
        ],
      },
    },
    {
      title: "Multi-tier Web Application Stack (VPROFILE)",
      description: "A full-stack web app deployed using AWS and Terraform.",
      githubLink: "https://github.com/jacegonzales/vprofile",
      externalLink: "https://vprofile.cloudifyops.xyz",
      technologies: {
        connect: [
          { id: technologyMap["AWS Elastic Beanstalk (Tomcat, NGINX)"] },
          { id: technologyMap["RDS"] },
          { id: technologyMap["S3/EFS"] },
          { id: technologyMap["ElastiCache"] },
          { id: technologyMap["Active MQ"] },
          { id: technologyMap["Route53"] },
          { id: technologyMap["Cloudfront"] },
          { id: technologyMap["Terraform"] },
        ],
      },
    },
    {
      title: "Job App Helper",
      description:
        "A frontend-only job application assistant tool built with Next.js and Redux.",
      githubLink: "https://github.com/jacegonzales/job-app-helper",
      externalLink: "https://job-app-helper.vercel.app",
      technologies: {
        connect: [
          { id: technologyMap["Next.js (Frontend)"] },
          { id: technologyMap["Redux (State Management)"] },
        ],
      },
    },
  ];

  await prisma.$transaction(
    projects.map((project) => prisma.project.create({ data: project }))
  );

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
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

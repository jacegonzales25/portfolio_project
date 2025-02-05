import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Define technology categories
  const technologyCategories = [
    "Cloud Platforms",
    "Frontend Development",
    "Backend Development",
    "Database",
    "DevOps & CI/CD",
    "Scripting & Automation",
  ];

  // Create technology categories
  const createdCategories = await Promise.all(
    technologyCategories.map((name) =>
      prisma.technologyCategory.create({ data: { name } })
    )
  );

  // Define technologies by category
  const technologies = [
    {
      name: "AWS (EC2, S3, RDS, Elastic Beanstalk, CloudFront)",
      category: "Cloud Platforms",
    },
    { name: "Docker", category: "Cloud Platforms" },
    { name: "Kubernetes (EKS)", category: "Cloud Platforms" },
    { name: "Terraform", category: "DevOps & CI/CD" },
    { name: "Ansible", category: "DevOps & CI/CD" },
    { name: "GitHub Actions", category: "DevOps & CI/CD" },
    { name: "Python", category: "Scripting & Automation" },
    { name: "Bash", category: "Scripting & Automation" },
    { name: "Node.js", category: "Scripting & Automation" },
    { name: "HTML", category: "Frontend Development" },
    { name: "CSS", category: "Frontend Development" },
    { name: "JavaScript", category: "Frontend Development" },
    { name: "TypeScript", category: "Frontend Development" },
    { name: "Java", category: "Backend Development" },
    { name: "PHP", category: "Backend Development" },
    { name: "React (Next.js)", category: "Frontend Development" },
    { name: "Flutter", category: "Frontend Development" },
    { name: "Express", category: "Backend Development" },
    { name: "PostgreSQL (Drizzle, Prisma)", category: "Database" },
    { name: "MySQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "Firebase", category: "Database" },
    { name: "Cache (Redis, ElasticCache)", category: "Database" },
    { name: "Git", category: "DevOps & CI/CD" },
    { name: "Jenkins", category: "DevOps & CI/CD" },
    { name: "RESTful APIs", category: "Backend Development" },
    { name: "Linux", category: "Backend Development" },
    { name: "GoDaddy (Domain Management)", category: "Cloud Platforms" },
  ];

  // Create technologies based on their categories
  const createdTechnologies = await Promise.all(
    technologies.map(async (tech) => {
      const category = createdCategories.find(
        (cat) => cat.name === tech.category
      );

      if (!category) {
        throw new Error(`Category "${tech.category}" not found.`);
      }

      return await prisma.technology.create({
        data: {
          name: tech.name,
          categoryId: category.id,
        },
      });
    })
  );

  console.log("Technologies and categories have been successfully added.");

  async function addExperience() {
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

    await Promise.all(
      experiences.map((exp) =>
        prisma.experience.create({
          data: exp,
        })
      )
    );

    console.log("Work Experience added.");
  }

  async function addProjects() {
    const technologies = [
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
  
    // Fetch all technologies from the database
    const technologiesInDb = await prisma.technology.findMany({
      where: {
        name: { in: technologies },
      },
    });
  
    // Create a map of technology name to its id
    const technologyMap = technologiesInDb.reduce((acc, tech) => {
      acc[tech.name] = tech.id;
      return acc;
    }, {});
  
    const projects = [
      {
        title: "Resume Portfolio",
        description: "A containerized portfolio showcasing my technical skills and projects.",
        image: null, // Optional image URL
        githubLink: "https://github.com/jacegonzales/resume-portfolio",
        externalLink: "https://jacegonzales.cloudifyops.xyz",
        technologies: {
          connect: [
            { id: technologyMap["Docker"] },
            { id: technologyMap["Docker Compose"] },
            { id: technologyMap["AWS (ECR, Elastic Beanstalk, RDS, S3, Route53 for GoDaddy)"] },
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
        image: null, // Optional image URL
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
        description: "A frontend-only job application assistant tool built with Next.js and Redux.",
        image: null, // Optional image URL
        githubLink: "https://github.com/jacegonzales/job-app-helper",
        externalLink: "https://job-app-helper.vercel.app",
        technologies: {
          connect: [
            { id: technologyMap["Next.js"] },
            { id: technologyMap["Redux (State Management)"] },
          ],
        },
      },
    ];
  
    await Promise.all(
      projects.map((project) =>
        prisma.project.create({
          data: project,
        })
      )
    );
  
    console.log("Projects added.");
  }
  
  console.log("Seed data has been successfully added!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

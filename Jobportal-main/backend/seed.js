import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";

dotenv.config();

const companies = [
    {
        name: "TechNova Labs",
        description: "Product engineering studio building cloud and web platforms.",
        website: "https://technova.example.com",
        location: "Bangalore"
    },
    {
        name: "DataPulse Analytics",
        description: "Analytics company helping teams turn data into decisions.",
        website: "https://datapulse.example.com",
        location: "Hyderabad"
    },
    {
        name: "FinEdge Systems",
        description: "Fintech platform for payments, risk, and business workflows.",
        website: "https://finedge.example.com",
        location: "Mumbai"
    },
    {
        name: "CloudBridge",
        description: "Cloud consulting and infrastructure automation company.",
        website: "https://cloudbridge.example.com",
        location: "Pune"
    }
];

const jobs = [
    {
        title: "Frontend Developer",
        description: "Build responsive React interfaces for a SaaS analytics dashboard.",
        requirements: ["React", "JavaScript", "Tailwind CSS", "REST APIs"],
        salary: 12,
        location: "Bangalore",
        jobType: "Full-time",
        experienceLevel: 2,
        position: 3,
        company: "TechNova Labs"
    },
    {
        title: "Backend Developer",
        description: "Create secure Node.js APIs, MongoDB models, and authentication flows.",
        requirements: ["Node.js", "Express", "MongoDB", "JWT"],
        salary: 14,
        location: "Pune",
        jobType: "Full-time",
        experienceLevel: 3,
        position: 2,
        company: "CloudBridge"
    },
    {
        title: "FullStack Developer",
        description: "Own features across React, Express, and MongoDB for fintech workflows.",
        requirements: ["React", "Node.js", "MongoDB", "TypeScript"],
        salary: 18,
        location: "Mumbai",
        jobType: "Hybrid",
        experienceLevel: 4,
        position: 2,
        company: "FinEdge Systems"
    },
    {
        title: "Data Science Intern",
        description: "Work on data cleaning, dashboards, and machine learning prototypes.",
        requirements: ["Python", "SQL", "Pandas", "Statistics"],
        salary: 5,
        location: "Hyderabad",
        jobType: "Internship",
        experienceLevel: 0,
        position: 4,
        company: "DataPulse Analytics"
    },
    {
        title: "MERN Stack Developer",
        description: "Develop job marketplace features, admin panels, and application tracking.",
        requirements: ["MongoDB", "Express", "React", "Node.js"],
        salary: 10,
        location: "Delhi NCR",
        jobType: "Remote",
        experienceLevel: 1,
        position: 5,
        company: "TechNova Labs"
    },
    {
        title: "DevOps Engineer",
        description: "Automate deployments, observability, and CI/CD for production systems.",
        requirements: ["Docker", "AWS", "Linux", "CI/CD"],
        salary: 16,
        location: "Bangalore",
        jobType: "Full-time",
        experienceLevel: 3,
        position: 2,
        company: "CloudBridge"
    }
];

const seed = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing in backend/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany({ email: { $in: ["recruiter@jobportal.com", "student@jobportal.com"] } });

    const password = await bcrypt.hash("Password123", 10);
    const recruiter = await User.create({
        fullname: "Demo Recruiter",
        email: "recruiter@jobportal.com",
        phoneNumber: "+919876543210",
        password,
        role: "recruiter",
        profile: {}
    });

    await User.create({
        fullname: "Demo Student",
        email: "student@jobportal.com",
        phoneNumber: "+919123456789",
        password,
        role: "student",
        profile: {
            skills: ["React", "Node.js", "MongoDB"]
        }
    });

    const companyDocs = [];
    for (const company of companies) {
        const companyDoc = await Company.findOneAndUpdate(
            { name: company.name },
            { ...company, userId: recruiter._id },
            { new: true, upsert: true }
        );
        companyDocs.push(companyDoc);
    }

    const companyByName = new Map(companyDocs.map((company) => [company.name, company]));

    for (const job of jobs) {
        const company = companyByName.get(job.company);
        await Job.findOneAndUpdate(
            { title: job.title, company: company._id },
            {
                ...job,
                company: company._id,
                created_by: recruiter._id
            },
            { new: true, upsert: true }
        );
    }

    console.log("Seed complete.");
    console.log("Recruiter: recruiter@jobportal.com / Password123");
    console.log("Student:   student@jobportal.com / Password123");
};

seed()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.connection.close();
    });

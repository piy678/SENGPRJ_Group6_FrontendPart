# LEO-Based Assessment Tool — Frontend

## Overview

This repository contains the **frontend application** for the LEO-Based Assessment Tool, a system designed to support learning outcome (LEO)–based assessment for both learners and teachers.  
The tool visualizes student progress, manages LEO structures, and allows teachers to record and evaluate assessment results in a structured, aligned way.

This project is part of the **Software Engineering Project** course (Code Analysis topic) at FHTW.

---
## User Handbook / User Guide

This section describes how end users interact with the LEO-Based Assessment Tool frontend.

### Teachers
- Log in using teacher credentials
- Create and manage LEO structures for a course
- Record and update assessment results for students
- View class-wide progress and mastery levels
- Define and adjust grading rules for each LEO

### Students
- Log in using student credentials
- View personal LEO mastery progress per course
- Check current assessment status
- Use visualizations to understand learning progress
- Get suggestions for next LEOs to prepare for

The frontend is designed to be intuitive and requires no technical knowledge from users.

## Installation / Setup Guide

The application is deployed on an AWS server and can be started using Docker.

### Prerequisites
- AWS EC2 instance (Linux)
- Docker and Docker Compose installed
- Java 17 (for local development)
- Git

### Setup on AWS Server
1. Clone the project repository on the AWS EC2 instance
2. Configure environment variables (database credentials, ports)
3. Start the application using Docker Compose
4. The backend and frontend services are started automatically

### Local Development (Optional)
1. Clone the repository
2. Start the database and backend using Docker Compose
3. Start the Electron frontend locally

## Technical Documentation

This section describes the technical architecture, components, and internal logic of the system.

### Architecture
- Backend: Java 17 with Spring Boot (REST API)
- Frontend: Electron-based UI using web technologies
- Database: Neon (managed PostgreSQL cloud database)
- Deployment: Docker and Docker Compose on AWS EC2
### Database

The system uses Neon, a managed cloud-based PostgreSQL database.
Neon provides serverless PostgreSQL with automatic scaling and branching support.

- Database engine: PostgreSQL (via Neon)
- Secure cloud connection using connection string and credentials
- Used for storing users, LEOs, assessments, and relationships
- Schema managed via JPA/Hibernate
### Backend Structure
- Controller layer: REST endpoints for LEOs, students, assessments, and recommendations
- Service layer: business logic (grading cascade, validation, recommendation logic)
- Persistence layer: JPA/Hibernate entities and repositories
- Security: role-based access control (Admin, Teacher, Student)

### Core Domain Model
- LEO: represents a learning outcome node in a graph
- Assessment: stores the status of a LEO for a student
- User: authenticated system user with a role
- Relationships: LEO dependencies are stored as graph relations

### API Overview
- `/leos` – manage learning outcomes and dependencies
- `/students` – manage students and enrollments
- `/assessments` – record and update assessment results

### Grading & Cascade Logic
When a higher-level LEO is marked as *Reached*, all dependent lower-level LEOs are automatically updated according to cascade rules.

### Architecture Overview
The frontend is a single-page application (SPA) built with React and Vite.
It communicates with the backend via RESTful APIs and renders LEO structures
and assessment results dynamically.

### Component Structure
- UI components handle presentation and user interaction
- Pages represent major views (teacher dashboard, student view)
- API services manage communication with the backend
- State is handled using React hooks

### Data Flow
1. User interaction triggers frontend events
2. REST API requests are sent to the backend
3. Backend responses are processed and stored in frontend state
4. UI updates dynamically based on received data

### Backend Integration
- Communication via HTTP (JSON)
- Role-based access (Teacher / Student)
- Authentication handled via tokens
- CORS configured for AWS deployment

### Key Technical Decisions
- Vite for fast development and builds
- React for component-based UI architecture
- TypeScript for type safety and maintainability

## Technical Documentation

The system consists of a Spring Boot backend, an Electron frontend, and a PostgreSQL database.
It follows a layered architecture (controller, service, persistence) with role-based security and automated grading cascade logic.

## Features (Frontend)

### **For Teachers**
- Creating and managing LEO structures  
- Entering and editing assessment results  
- Viewing class-wide mastery levels  
- Managing grading rules for each LEO  

### **For Students**
- Viewing individualized LEO mastery progress  
- Understanding current standings for each course  
- Getting suggestions for which next LEOs to prepare for  

### **General**
- Modern, responsive UI  
- Real-time data fetching from backend  
- Visualization components (graphs, progress indicators)  
- User-friendly navigation for learners and teachers  

---

## Tech Stack

This frontend is built using:

- **Vite** (fast development/build tooling)  
- **TypeScript**  
- **React** 
- **CSS**
- **HTML**

---

## Project Structure

```text
app/
├── electron/                 # Electron main process
├── public/                   # Static assets
├── src/
│   ├── api/                  # Backend communication (HTTP, errors)
│   ├── components/           # Reusable UI components
│   │   └── UI.jsx
│   ├── pages/                # Application pages
│   │   ├── teacher/
│   │   │   └── tabs/          # Teacher dashboard tabs
│   │   ├── student/           # Student dashboard pages
│   │   ├── Login.jsx
│   │   └── Landing.jsx
│   ├── App.jsx                # Root React component
│   ├── main.jsx               # Application entry point
│   └── mockData.js            # Mock data for development
├── vite-project/              # Vite build setup
├── docker-compose.yml         # Docker configuration
├── Dockerfile                 # Frontend Docker image
├── index.html                 # HTML entry
├── package.json
├── vite.config.js
└── README.md



---

## Setup Instructions

### **Install dependencies**
```bash
npm install
```
```bash
npm install concurrently --save-dev
```
Run the development server (Vite)

Run this in the Visual Studio Code Terminal:
```bash
npm run dev
```
Start the Electron app

Creates a desktop window and loads the Vite app inside it:
Run this command **in the terminal from the correct project path**:
```bash
npm run start
```

## Purpose and Background

The tool supports constructive alignment, where learning outcomes (LEOs) define what students must know or be able to do, and assessments measure mastery of these outcomes instead of grading isolated tasks.

Some LEOs depend on others—mastering a high-level outcome implies mastery of its supporting lower-level outcomes.
The frontend helps visualize these hierarchical structures and mastery levels.

## Requirements for Developers

To work on this project, it is recommended that you have:

- Basic programming skills

- Interest in education technology

- Fundamental web development knowledge (HTML, CSS, JavaScript/TypeScript)

- Familiarity with modern frontend frameworks (React/Vite recommended)

## Reflection

During the development of this project, we gained practical experience in designing and implementing a full-stack application with a clear separation of frontend, backend, and database layers.

One of the main challenges was implementing the LEO dependency graph and the cascade grading logic, as changes to a single learning outcome could affect multiple dependent outcomes. Ensuring data consistency and correct transactional behavior required careful design and testing.

Deploying the system using Docker on an AWS server and integrating a cloud-based database (Neon PostgreSQL) improved our understanding of modern deployment workflows and cloud infrastructure.

Overall, the project helped us strengthen our skills in backend development with Spring Boot, REST API design, role-based security, testing strategies, and collaborative software development.

## Evidence for Grading Criteria

Evidence for all grading criteria is provided and documented using multiple tools and artifacts.

### Source Code
- Frontend and backend source code are maintained in GitHub repositories
- Commit history and pull requests document the development process

### Project Management (PM)
Project management was conducted using agile methods.

- A GitHub Project board was used for backlog management, task tracking, and iteration planning  
  (including requirements engineering, implementation tasks, testing, deployment, and documentation)
- Tasks were organized into iterations and tracked with status updates
- Responsibilities and progress were clearly assigned to team members

Additionally, backlog planning and task refinement were performed using **Microsoft Azure DevOps Boards**,
which were used to complement GitHub Projects for detailed backlog structuring and planning.

### Deployment & Configuration
- Deployment was performed using Docker and Docker Compose
- The application is hosted on an AWS EC2 server
- Configuration includes cloud-based database access (Neon PostgreSQL)

### Documentation & Reflection
- Technical documentation and user handbook are provided in the project repositories
- Reflection, personal contribution, and personal development are documented and submitted via Moodle

All required evidence for grading criteria has been submitted via **Moodle** as specified.


## Project Management

The project was developed using agile software development practices.

Project management included:
- Sprint planning and sprint reviews
- Backlog management and task distribution
- Time tracking per team member
- Regular team meetings and coordination

All project management artifacts (backlog, sprint reviews, time tracking)
are provided as part of the Moodle submission.


## Personal Contribution

All group members contributed actively to the project.

Contributions included:
- Frontend and backend development
- API design and integration
- Testing and debugging
- Deployment and documentation

Detailed individual contributions are documented in the complete project plan and task overview are available here:  
https://github.com/users/piy678/projects/7

For grading purposes, the GitHub Project board serves as the primary source of
project management evidence.

## Personal Development

Through this project, we developed both technical and personal skills.

Technical growth included:
- Full-stack development
- Cloud deployment with AWS
- Working with distributed systems

Personal development included:
- Team communication
- Time management
- Problem-solving in a collaborative environment


## Contributors

El Khadra Tareq  
Kovalko Markiian  
Yalcin Pinar  
Zhou Lukas  

### Group 6 — SENGPRJ

### Supervisor: Thomas Mandl

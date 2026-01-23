# LEO-Based Assessment Tool — Frontend

## Overview

This repository contains the **frontend application** for the LEO-Based Assessment Tool, a system designed to support learning outcome (LEO)–based assessment for both learners and teachers.  
The tool visualizes student progress, manages LEO structures, and allows teachers to record and evaluate assessment results in a structured, aligned way.

This project is part of the **Software Engineering Project** course (Code Analysis topic) at FHTW.

### Features
- creation of LEO structure and grade calculation for teachers
- recording and editing of assessment results for teachers
- visualization of current standings for learners
- suggestion of possible next LEOs to prepare for student

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
- Node.js (for local frontend development)

### Setup on AWS Server
1. Clone the project repository on the AWS EC2 instance
2. Configure environment variables (database credentials, ports)
3. Start the application using Docker Compose
```bash
docker compose up -d
```
5. The backend and frontend services are started automatically

### Local Development (Optional)
1. Clone the repository
```bash
git clone https://github.com/piy678/SENGPRJ_Group6_FrontendPart
cd SENGPRJ_Group6_FrontendPart
```
3. Start the database and backend using Docker Compose
```bash
docker compose up -d
```
7. The backend and frontend services are started automatically
Production URL:
http://13.53.169.202:5174

### Start the Electron frontend locally

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

## Tech Stack

This frontend is built using:

- **Vite** (fast development/build tooling)  
- **TypeScript**  
- **React** 
- **CSS**
- **HTML**

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

### Project Management (PM)
Project management was conducted using agile methods with iterative development
(sprints/iterations) and continuous progress tracking.

- A GitHub Project board was used for backlog management, task tracking, and iteration planning  
  (including requirements engineering, implementation tasks, testing, deployment, and documentation)
- Tasks were organized into iterations and tracked with status updates
- Responsibilities and progress were clearly assigned to team members

#### Task Planning & Implementation Tracking
- **GitHub Projects** were used for detailed task planning and implementation tracking
- Tasks were linked to concrete development activities such as backend implementation,
  frontend development, testing, deployment, and documentation
- Task states (e.g., To Do, In Progress, Done) were continuously updated

GitHub Project Board:  
https://github.com/users/piy678/projects/7

#### Time Tracking & Sprint Reviews
- Time estimates and actual effort were tracked per task within the project boards
- Sprint/iteration reviews were conducted after each iteration to evaluate progress,
  review completed work items, and plan subsequent tasks
- The backlog was continuously refined based on sprint outcomes and project progress

Additionally, backlog planning and task refinement were performed using **Microsoft Azure DevOps Boards**,
which were used to complement GitHub Projects for detailed backlog structuring and planning.

#### Backlog & Task Management
- The main product backlog and sprint backlogs were maintained using
  **Microsoft Azure DevOps Boards**
- User stories, functional requirements, and non-functional requirements
  were created, prioritized, and tracked through iterations
- Each work item was assigned to team members and tracked until completion

Azure DevOps Boards (Backlog & Sprints):  
https://dev.azure.com/BWI-25WS-SEPR-Team06/LEOBasedAssessment/_sprints/backlog/LEOBasedAssessment%20Team/LEOBasedAssessment/Sprint%201

## Evidence for Grading Criteria

Evidence for all grading criteria is provided through documented project artifacts,
repositories, and management tools. The evidence is structured according to the
three main grading categories defined in the course.

---

### Solution (40%)

**Functionality (30%)**
- Fully implemented frontend and backend applications
- Role-based access for teachers and students
- LEO creation, assessment recording, progress visualization, and recommendations
- Deployed and runnable system (AWS + Docker)

**Quality (10%)**
- Clean layered architecture (controller, service, repository)
- Use of Spring Boot, JPA, and React/Electron
- Validation, error handling, and security checks
- Unit and integration tests

Evidence:
- Frontend repository: https://github.com/piy678/SENGPRJ_Group6_FrontendPart
- Backend repository: https://github.com/piy678/SENGPRJ_Group6
- Deployed system on AWS

---
### Process (40%)

**Planning & Requirements Engineering**
- User stories and functional/non-functional requirements defined and tracked
- Backlog management using Azure DevOps Boards

**Analysis, Design, Implementation & Testing**
- Iterative development across multiple sprints
- Continuous implementation and testing
- Code reviews and refactoring during development

**Teamwork & Project Management**
- Task assignment and progress tracking
- Time tracking and sprint reviews
- Use of GitHub Projects for implementation planning

**Deployment**
- Docker-based deployment on AWS EC2
- Environment-based configuration and cloud database (Neon)

Evidence:
- Azure DevOps Boards (backlog & sprints): https://dev.azure.com/BWI-25WS-SEPR-Team06/LEOBasedAssessment/_sprints/backlog/LEOBasedAssessment%20Team/LEOBasedAssessment/Sprint%201
- GitHub Project board: https://github.com/users/piy678/projects/7
- Docker and deployment documentation in repositories

---

### Presentation (20%)

**Presentation (10%)**
- Structured presentation of the project and system architecture
- Live demonstration of core features

**Project Reflection (10%)**
- Written reflection covering challenges, solutions, and lessons learned
- Evaluation of teamwork, tools, and development process

Evidence:
- Presentation slides (submitted via Moodle also on Github)
- Written project reflection document

---

### Source Code

- Frontend and backend source code are maintained in two **separate GitHub repositories**
- Version control is handled via Git, with a complete commit history documenting
  the development process
- Commits and pull requests provide traceability of changes, bug fixes, and feature implementation

Repositories:
- Frontend: https://github.com/piy678/SENGPRJ_Group6_FrontendPart
- Backend: https://github.com/piy678/SENGPRJ_Group6

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
- Time tracking and progress monitoring
- Regular team coordination

Backlogs and sprint planning were managed using project management tools
(e.g. Azure DevOps Boards and GitHub Projects), with relevant artifacts
submitted via Moodle.


## Personal Contribution

All group members contributed actively to the project across multiple areas.

Contributions included:
- Frontend and backend development
- API design and system integration
- Testing and debugging
- Deployment and documentation

Individual responsibilities and contributions are documented in the project plan
and task tracking system.

Project management and contribution evidence:
https://github.com/users/piy678/projects/7

For grading purposes, the GitHub Project board provides traceable evidence of
task assignments, progress, and completed work per team member.
Each task in the project board is assigned to specific team members,
allowing individual contributions to be clearly identified.

## Personal Development

Through this project, we developed both technical and personal skills.

### Technical Development
- Full-stack development (frontend and backend integration)
- Cloud-based deployment using AWS
- Use of a managed cloud PostgreSQL database (Neon)
- Working with client–server architectures and distributed components

### Personal Development
- Effective team communication and collaboration
- Time management and task prioritization
- Problem-solving in a collaborative development environment

## Questions:
Should the tool be web-based (browser) or desktop-based (JavaFX, Electron, etc.)?   
Electron desktop app. Built with web tech, packaged to run locally on Windows/macOS/Linux.   

Do we need to implement authentication or can we assume a single teacher and student?  
Yes. Support separate accounts and roles for multiple teachers and students.   

How detailed should the LEO structure be (tree hierarchy vs. simple list)?  
As a graph. Nodes and relationships (not just a simple tree or flat list).   

Should the visualization be graphical (like a dependency tree) or textual (list with status)?  
Text/list view. A graphic diagram is considered too complex; a list is more precise for this use case.   

Should we store the data locally or in a database (e.g. SQLite, MySQL)?  
In a database. Use a proper DB (e.g., SQLite/MySQL) rather than local files only.  

Is suggestion logic mandatory or optional (for “next possible LEOs”)?  
Mandatory. The system must generate recommendations (e.g., next applicable LEOs).   

Should grading levels (“not reached”, “partially reached”, “reached”) be customizable?  
No. Use fixed levels, with “Unmark” as the fourth level in addition to the existing ones.   

## Related Repository

This frontend application communicates with the backend service of the
LEO-Based Assessment Tool.

Backend repository:  
https://github.com/piy678/SENGPRJ_Group6

## Contributors

El Khadra Tareq  
Kovalko Markiian  
Yalcin Pinar  
Zhou Lukas  

### Group 6 — SENGPRJ

### Supervisor: Thomas Mandl

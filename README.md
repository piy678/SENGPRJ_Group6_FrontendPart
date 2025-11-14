# LEO-Based Assessment Tool — Frontend

## Overview

This repository contains the **frontend application** for the LEO-Based Assessment Tool, a system designed to support learning outcome (LEO)–based assessment for both learners and teachers.  
The tool visualizes student progress, manages LEO structures, and allows teachers to record and evaluate assessment results in a structured, aligned way.

This project is part of the **Software Engineering Project** course (Code Analysis topic) at FHTW.

---

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

app/
vite-project/
src/
main.ts
counter.ts
style.css
...
index.html
vite.config.js
tsconfig.json
.gitignore
README.md


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

## Contributors

### Group 6 — SENGPRJ

### Supervisor: Thomas Mandl

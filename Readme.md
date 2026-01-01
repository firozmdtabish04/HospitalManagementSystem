Hospital Management System
![image](https://github.com/firozmdtabish04/HospitalManagementSystem/blob/f0c4a6ae12cad892b142198673d9660f42ebf368/HMS/HMS-2.png,https://github.com/firozmdtabish04/HospitalManagementSystem/blob/f0c4a6ae12cad892b142198673d9660f42ebf368/HMS/HMS-3.png,https://github.com/firozmdtabish04/HospitalManagementSystem/blob/f0c4a6ae12cad892b142198673d9660f42ebf368/HMS/HMS-1.png)
🔗 Repository:
https://github.com/firozmdtabish04/HospitalManagementSystem.git

📖 Overview

The Hospital Management System (HMS) is a full-stack Spring Boot–based web application designed to streamline and automate hospital operations. The system efficiently manages patient registration, appointment scheduling, doctor management, medical services, and medicine tracking.

It follows a role-based architecture with separate modules for Admin, Doctor, and Patient, ensuring secure and organized access to healthcare data.

🛠️ Tech Stack

Backend: Java, Spring Boot

Frontend: HTML, CSS, JavaScript (Angular if integrated)

Database: MySQL

API: RESTful Web Services

Authentication: Role-based login (Admin, Doctor, Patient)

Tools: Maven, Git, GitHub, Postman

⚙️ Features
👨‍⚕️ Doctor Module

View and manage assigned patient appointments

Prescribe medicines to patients

Track patient medical records

🧑‍💻 Admin Module

Add, update, and manage doctors, patients, and staff

Manage hospital services and departments

View and monitor overall hospital records

🧍 Patient Module

Register and log in securely

Book appointments with doctors

View appointment history and prescribed medicines

🧾 Hospital Services Management

CRUD operations for medical services

Manage availability of hospital facilities

🔐 User Authentication & Authorization

Secure login system

Role-based access control (Admin, Doctor, Patient)

📦 RESTful API Design

Clean and structured REST APIs

Easily integrable with frontend or mobile applications

📂 Project Structure (High-Level)
HospitalManagementSystem
│
├── controller
├── service
├── repository
├── model
├── config
├── resources
│   ├── application.properties
│
├── pom.xml
└── README.md

⚙️ Installation & Setup
Prerequisites

Java 8 or higher

MySQL

Maven

Git

Steps to Run Locally
# Clone the repository
git clone https://github.com/firozmdtabish04/HospitalManagementSystem.git

# Navigate to project directory
cd HospitalManagementSystem

# Configure database in application.properties

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run

🧪 API Testing

APIs can be tested using Postman

Supports CRUD operations for all major modules

🎯 Use Cases

Academic / College Project

Java Full Stack Practice

Resume & Internship Showcase

Backend REST API Learning

👨‍💻 Author

Tabish Firoz

GitHub: https://github.com/firozmdtabish04

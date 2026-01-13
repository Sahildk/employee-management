# Premium Employee Management System

A state-of-the-art, premium full-stack web application designed for seamless employee management. Built with a powerful **Flask** backend and a stunning **Next.js 16** frontend featuring **Aceternity UI** and **Shadcn UI** components.

![Tech Stack](https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Tech Stack](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Tech Stack](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Tech Stack](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tech Stack](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Tech Stack](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)

## ✨ Premium Features

- **Top-Tier UI/UX**:
    - **Aceternity UI Spotlight**: Dynamic lighting effects on the landing page.
    - **Glassmorphism**: Advanced frosted glass aesthetics using backdrop-blur.
    - **Dark Mode**: Optimized dark theme for a sleek, professional look.
    - **Animations**: Smooth transitions powered by Framer Motion.
- **Advanced Dashboard**:
    - **Real-Time Data**: Live fetching of employee records.
    - **Interactive Tables**: premium Shadcn UI tables with hover effects.
    - **Search & Filter**: Instant filtering by name, role, or department.
    - **Smart Forms**: Validated with Zod and React Hook Form.
    - **Toast Notifications**: Interactive success/error alerts using Sonner.
- **Robust Backend**:
    - RESTful API built with Flask.
    - MongoDB Atlas integration for scalable data storage.
    - Dockerized for consistent deployment.
- **Automated CI/CD**:
    - Full Jenkins pipeline for Build, Test, and Deploy.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Libraries**:
    - Shadcn UI (Components)
    - Aceternity UI (Effects)
    - Lucide React (Icons)
- **State Management**: React Hooks
- **Form Handling**: React Hook Form + Zod

### Backend
- **Framework**: Flask (Python 3.11+)
- **Database**: MongoDB Atlas
- **Driver**: PyMongo
- **Utilities**: Flask-CORS, Dotenv

### DevOps & Infrastructure
- **Docker**: Containerization for Backend and Frontend.
- **Docker Compose**: Orchestration of services.
- **Jenkins**: Automated CI/CD pipelines.

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.10+
- MongoDB Atlas Connection URI
- Docker & Jenkins (for CI/CD)

### 1. Backend Setup

navigate to the `backend` folder:
```bash
cd backend
```

Create a virtual environment:
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Run the server:
```bash
python app.py
```
_The server will start at `http://localhost:5000`_

### 2. Frontend Setup

Open a new terminal and navigate to the `frontend` folder:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```
_The application will be available at [`http://localhost:3000`](http://localhost:3000)_

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/employees` | Retrieve all employees |
| `GET` | `/api/employees/<id>` | Retrieve a specific employee |
| `POST` | `/api/employees` | Create a new employee |
| `PUT` | `/api/employees/<id>` | Update an employee |
| `DELETE` | `/api/employees/<id>` | Delete an employee |

## 🔄 CI/CD Pipeline (Jenkins)

The project includes a `Jenkinsfile` for automated deployment:

1.  **Checkout**: Pulls code from the repository.
2.  **Build**:
    *   Builds `employee-management-backend` Docker image.
    *   Builds `employee-management-frontend` Docker image.
3.  **Test**: Runs placeholder tests for both services.
4.  **Push**: Pushes Docker images to the registry (on `main` branch).
5.  **Deploy**: Deploys the application containers.

**Configuration**:
*   Set `DOCKER_REGISTRY` in `Jenkinsfile`.
*   Configure Docker credentials in Jenkins with ID `docker-credentials`.

## 📂 Project Structure

```
.
├── backend/               # Flask API
│   ├── app.py             # Entry point
│   ├── content/           # Static content (if any)
│   ├── models/            # Database models (Employee)
│   └── routes/            # API endpoints
├── frontend/              # Next.js Application
│   ├── src/
│   │   ├── app/           # App Router pages (Dashboard, Home)
│   │   ├── components/    # Reusable UI components
│   │   │   ├── ui/        # Shadcn UI primitives
│   │   │   └── ...
│   │   ├── lib/           # Utilities and API services
│   │   └── types/         # TypeScript definitions
│   └── public/            # Static assets
├── Jenkinsfile            # CI/CD Pipeline
├── docker-compose.yml     # Docker Services
└── README.md              # Project documentation
```

## 🔐 Environment Variables

**Backend (.env)**
```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?appName=Cluster0
PORT=5000
```

**Frontend**
The frontend is configured to proxy requests or point directly to `http://localhost:5000/api`.

---
**Built with precision and style.**

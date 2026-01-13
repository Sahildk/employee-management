# Employee Management System

A full-stack web application for managing employee records with CRUD operations, built with Flask backend, Next.js frontend, MongoDB Atlas database, and containerized with Docker.

![Tech Stack](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete employee records
- **Modern UI**: Glassmorphism design with dark mode and smooth animations
- **RESTful API**: Well-structured Flask backend with MongoDB integration
- **Containerized**: Docker and docker-compose for easy deployment
- **CI/CD Pipeline**: Jenkins pipeline for automated builds and deployments
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📋 Tech Stack

### Backend
- **Python 3.11** with Flask framework
- **MongoDB Atlas** for cloud database
- **Flask-CORS** for cross-origin requests
- **pymongo** for MongoDB operations

### Frontend
- **Next.js 16** with React 19
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **Axios** for API calls
- **Lucide React** for icons

### DevOps
- **Docker** for containerization
- **Docker Compose** for orchestration
- **Jenkins** for CI/CD pipeline
- **GitHub** for version control

## 🏗️ Project Structure

```
employee-management-system/
├── backend/                # Flask Application
│   ├── app.py              # Entry point
│   ├── Dockerfile          # Backend Docker image
│   ├── requirements.txt    # Python dependencies
│   ├── models/             # Database models
│   │   └── employee.py     # Employee model
│   └── routes/             # API endpoints
│       └── employee_routes.py
├── frontend/               # Next.js Application
│   ├── app/                # Next.js app directory
│   │   ├── page.tsx        # Main dashboard
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── Navbar.tsx
│   │   ├── EmployeeCard.tsx
│   │   └── EmployeeForm.tsx
│   ├── Dockerfile          # Frontend Docker image
│   └── package.json        # JS dependencies
├── docker-compose.yml      # Orchestrates both services
├── Jenkinsfile             # CI/CD Pipeline configuration
└── README.md               # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Docker and Docker Compose installed
- MongoDB Atlas account (or local MongoDB)
- Node.js 20+ (for local development)
- Python 3.11+ (for local development)

### Option 1: Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd employee-management-system
   ```

2. **Update MongoDB connection string**
   
   Edit `docker-compose.yml` and replace `<db_password>` with your actual MongoDB password:
   ```yaml
   environment:
     - MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.vszrnok.mongodb.net/?appName=Cluster0
   ```

3. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/api/health

### Option 2: Local Development

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create .env file**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.vszrnok.mongodb.net/?appName=Cluster0
   PORT=5000
   ```

5. **Run the backend**
   ```bash
   python app.py
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env.local file**
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   
   Navigate to http://localhost:3000

## 📡 API Endpoints

### Employee Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/<id>` | Get single employee by ID |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/<id>` | Update employee by ID |
| DELETE | `/api/employees/<id>` | Delete employee by ID |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check API health status |

### Request/Response Examples

**Create Employee (POST /api/employees)**
```json
{
  "name": "John Doe",
  "email": "john.doe@company.com",
  "position": "Software Engineer",
  "department": "Engineering",
  "salary": 75000,
  "hire_date": "2024-01-15"
}
```

**Response**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john.doe@company.com",
  "position": "Software Engineer",
  "department": "Engineering",
  "salary": 75000,
  "hire_date": "2024-01-15"
}
```

## 🔄 CI/CD Pipeline

The Jenkins pipeline includes the following stages:

1. **Checkout**: Clone code from GitHub
2. **Build Backend**: Build Flask Docker image
3. **Build Frontend**: Build Next.js Docker image
4. **Test Backend**: Run backend tests
5. **Test Frontend**: Run frontend tests
6. **Push to Registry**: Push images to Docker registry (main branch only)
7. **Deploy**: Deploy application (main branch only)

### Setting up Jenkins

1. Install Jenkins with Docker plugin
2. Create a new Pipeline job
3. Point to your GitHub repository
4. Configure webhook for automatic builds
5. Add Docker registry credentials (ID: `docker-credentials`)

## 🎨 UI Features

- **Glassmorphism Design**: Modern frosted glass effect
- **Dark Mode**: Eye-friendly dark theme
- **Gradient Backgrounds**: Beautiful purple/blue gradients
- **Smooth Animations**: Hover effects and transitions
- **Responsive Layout**: Mobile-first design
- **Loading States**: Elegant loading indicators
- **Error Handling**: User-friendly error messages

## 🔐 Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🐳 Docker Commands

**Build images**
```bash
docker-compose build
```

**Start services**
```bash
docker-compose up
```

**Start in detached mode**
```bash
docker-compose up -d
```

**Stop services**
```bash
docker-compose down
```

**View logs**
```bash
docker-compose logs -f
```

**Rebuild and restart**
```bash
docker-compose up --build --force-recreate
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
python -m pytest tests/
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 License

This project is open source and available under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

---

**Built with ❤️ using Flask, Next.js, and MongoDB**

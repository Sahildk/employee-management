pipeline {
    agent any

    environment {
        IMAGE_TAG = "${BUILD_NUMBER}"
        BACKEND_IMAGE = "employee-management-backend"
        FRONTEND_IMAGE = "employee-management-frontend"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                echo 'Building Backend Docker Image...'
                dir('backend') {
                    bat "docker build -t %BACKEND_IMAGE%:%IMAGE_TAG% ."
                    bat "docker build -t %BACKEND_IMAGE%:latest ."
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Building Frontend Docker Image...'
                dir('frontend') {
                    bat "docker build -t %FRONTEND_IMAGE%:%IMAGE_TAG% ."
                    bat "docker build -t %FRONTEND_IMAGE%:latest ."
                }
            }
        }

        stage('Test Backend') {
            steps {
                echo 'Running Backend Tests...'
                bat "echo Backend tests would run here"
            }
        }

        stage('Test Frontend') {
            steps {
                echo 'Running Frontend Tests...'
                bat "echo Frontend tests would run here"
            }
        }

        stage('SonarCloud Analysis') {
            steps {
                withSonarQubeEnv('SonarCloud') {
                    bat """
                    docker run --rm ^
                    -e SONAR_HOST_URL=https://sonarcloud.io ^
                    -e SONAR_LOGIN=%SONAR_AUTH_TOKEN% ^
                    -v "%cd%:/usr/src" ^
                    sonarsource/sonar-scanner-cli ^
                    -Dsonar.organization=sahildk ^
                    -Dsonar.projectKey=Sahildk_employee-management ^
                    -Dsonar.sources=.
                    """
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying Application using Docker Compose...'
                bat "docker compose up -d --build"
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            echo 'Pipeline execution finished.'
        }
    }
}

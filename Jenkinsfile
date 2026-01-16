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
                // Run pytest with coverage report in XML format for SonarQube
                bat "docker run --rm %BACKEND_IMAGE%:%IMAGE_TAG% pytest --cov=. --cov-report=xml"
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
                    withCredentials([string(credentialsId: 'sonarcloud-token', variable: 'SONAR_TOKEN')]) {
                        script {
                            def scannerHome = tool 'sonar-scanner'
                            bat """
                            "${scannerHome}\\bin\\sonar-scanner" ^
                            -Dsonar.organization=sahildk ^
                            -Dsonar.projectKey=Sahildk_employee-management ^
                            -Dsonar.sources=. ^
                            -Dsonar.python.coverage.reportPaths=backend/coverage.xml ^
                            -Dsonar.login=%SONAR_TOKEN%
                            """
                        }
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
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

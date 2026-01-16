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
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    bat "docker build -t %BACKEND_IMAGE%:%IMAGE_TAG% ."
                    bat "docker build -t %BACKEND_IMAGE%:latest ."
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat "docker build -t %FRONTEND_IMAGE%:%IMAGE_TAG% ."
                    bat "docker build -t %FRONTEND_IMAGE%:latest ."
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir('backend') {
                    bat '''
                    python -m venv venv
                    call venv\\Scripts\\activate.bat
                    pip install -r requirements.txt
                    pytest --cov=. --cov-report=xml
                    '''
                }
            }
        }

        stage('Test Frontend') {
            steps {
                bat "echo Frontend tests placeholder"
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
                            -Dsonar.token=%SONAR_TOKEN%
                            """
                        }
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: false
                }
            }
        }

        stage('Deploy') {
            steps {
                bat "docker compose up -d --build"
            }
        }

        post {
            success {
                echo 'Pipeline completed successfully'
            }
            failure {
                echo 'Pipeline failed'
            }
            always {
                echo 'Pipeline execution finished'
            }
        }
    }
}

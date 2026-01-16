pipeline {
    agent any

    environment {
        IMAGE_TAG = "${BUILD_NUMBER}"
        BACKEND_IMAGE = "employee-management-backend"
        FRONTEND_IMAGE = "employee-management-frontend"
    }

    stages {

        /* 1. SOURCE CONTROL */
        stage('Source: Checkout from Git') {
            steps {
                echo 'Fetching source code from GitHub...'
                checkout scm
            }
        }

        /* 2. BUILD STAGE */
        stage('Build: Application Images') {
            parallel {

                stage('Build Backend Image') {
                    steps {
                        dir('backend') {
                            bat "docker build -t %BACKEND_IMAGE%:%IMAGE_TAG% ."
                            bat "docker build -t %BACKEND_IMAGE%:latest ."
                        }
                    }
                }

                stage('Build Frontend Image') {
                    steps {
                        dir('frontend') {
                            bat "docker build -t %FRONTEND_IMAGE%:%IMAGE_TAG% ."
                            bat "docker build -t %FRONTEND_IMAGE%:latest ."
                        }
                    }
                }
            }
        }

        /* 3. TEST STAGE */
        stage('Test: Application') {
            stages {

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
                        echo 'Frontend tests placeholder (can be extended later)'
                    }
                }
            }
        }

        /* 4. CODE QUALITY */
        stage('Quality: SonarCloud Analysis') {
            steps {
                withSonarQubeEnv('SonarCloud') {
                    withCredentials([
                        string(credentialsId: 'sonarcloud-token', variable: 'SONAR_TOKEN')
                    ]) {
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

        /* 5. QUALITY GATE */
        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: false
                }
            }
        }

        /* 6. DEPLOYMENT */
        stage('Deploy: Docker Compose') {
            steps {
                echo 'Deploying full application stack...'
                bat "docker compose up -d --build"
            }
        }
    }

    /* 7. POST ACTIONS */
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check logs.'
        }
        always {
            echo 'Pipeline execution finished.'
        }
    }
}

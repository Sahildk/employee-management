pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'docker.io'  // Change to your registry
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
                    script {
                        docker.build("${BACKEND_IMAGE}:${IMAGE_TAG}")
                        docker.build("${BACKEND_IMAGE}:latest")
                    }
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                echo 'Building Frontend Docker Image...'
                dir('frontend') {
                    script {
                        docker.build("${FRONTEND_IMAGE}:${IMAGE_TAG}")
                        docker.build("${FRONTEND_IMAGE}:latest")
                    }
                }
            }
        }
        
        stage('Test Backend') {
            steps {
                echo 'Running Backend Tests...'
                dir('backend') {
                    sh '''
                        echo "Backend tests would run here"
                        # Add your test commands here
                        # Example: python -m pytest tests/
                    '''
                }
            }
        }
        
        stage('Test Frontend') {
            steps {
                echo 'Running Frontend Tests...'
                dir('frontend') {
                    sh '''
                        echo "Frontend tests would run here"
                        # Add your test commands here
                        # Example: npm test
                    '''
                }
            }
        }
        
        stage('Push to Registry') {
            when {
                branch 'main'  // Only push on main branch
            }
            steps {
                echo 'Pushing Docker Images to Registry...'
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", 'docker-credentials') {
                        docker.image("${BACKEND_IMAGE}:${IMAGE_TAG}").push()
                        docker.image("${BACKEND_IMAGE}:latest").push()
                        docker.image("${FRONTEND_IMAGE}:${IMAGE_TAG}").push()
                        docker.image("${FRONTEND_IMAGE}:latest").push()
                    }
                }
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying Application...'
                sh '''
                    echo "Deployment commands would run here"
                    # Example: docker-compose up -d
                    # Or deploy to Kubernetes, AWS, etc.
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
            // Add notifications here (Slack, Email, etc.)
        }
        failure {
            echo 'Pipeline failed!'
            // Add failure notifications here
        }
        always {
            echo 'Cleaning up...'
            sh 'docker system prune -f'
        }
    }
}

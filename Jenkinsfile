
pipeline {
    agent any

    tools {
        jdk 'JDK21'
        maven 'Maven3'
    }

    environment {
        WAR_FILE = 'target/amiya.war'
        TOMCAT_WEBAPPS = '/opt/tomcat/webapps'
    }

    options {
        timestamps()
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'GitHub se code checkout ho raha hai...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Maven build start...'
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('Verify') {
            steps {
                echo 'WAR file verify ho rahi hai...'
                sh '''
                    test -f "$WAR_FILE"
                    unzip -t "$WAR_FILE"
                '''
            }
        }

        stage('Deploy to Tomcat') {
            steps {
                echo 'Tomcat par deployment start...'
                sh '''
                    sudo cp "$WAR_FILE" "$TOMCAT_WEBAPPS/amiya.war"
                    echo "WAR deployed successfully"
                '''
            }
        }
    }

    post {
        success {
            echo 'AMIYA CI/CD Pipeline SUCCESS!'
            echo 'Application Tomcat par deploy ho gayi.'
        }

        failure {
            echo 'AMIYA Pipeline FAILED!'
            echo 'Console Output check karo.'
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}

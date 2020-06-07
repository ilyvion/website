pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
				sh 'npm install'
                sh 'npm run-script build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run-script test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'build/**/*', fingerprint: true
        }
    }
}
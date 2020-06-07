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
			environment {
				CI = 'true'
			}
            steps {
                sh 'npm run-script test'
            }
        }

        stage('Deploy') {
            steps {
				sh 'rsync -av --delete --exclude alexschrod.asc --exclude keybase.txt --exclude phpmyadmin --dry-run build/ /var/www/html'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'build/**/*', fingerprint: true
        }
    }
}
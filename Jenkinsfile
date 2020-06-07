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
			when {
				expression {
					return env.GIT_BRANCH == "origin/build"
				}
			} 
            steps {
				sh 'rsync -av --delete --exclude alexschrod.asc --exclude keybase.txt --exclude phpmyadmin build/ /var/www/html'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'build/**/*', fingerprint: true
        }
    }
}
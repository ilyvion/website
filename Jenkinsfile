pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
				sh 'npm install'
                sh 'npm run-script build'
            	archiveArtifacts artifacts: 'public/**/*', fingerprint: true
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
				sh 'rsync -av --delete --exclude-from=/var/www/html/protect-files public/ /var/www/html'
            }
        }
    }
}
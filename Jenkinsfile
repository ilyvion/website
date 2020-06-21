pipeline {
    agent any

    stages {
		stage('Install') {
			steps {
				sh 'npm install'
			}
		}
        stage('Build') {
            steps {
				sh 'npm run-script clean'
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
		stage('Archive') {
            steps {
				sh 'rm *.tar.bz2'
				sh 'tar cjvf public-$(git rev-parse HEAD).tar.bz2 public'
				archiveArtifacts artifacts: 'public-*.tar.bz2', fingerprint: true
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
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
                sh 'NODE_OPTIONS=--max_old_space_size=4096 nice -n 10 npm run-script build'
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
					return env.GIT_BRANCH == "origin/master"
				}
			} 
            steps {
				sh 'rsync -av --delete --exclude-from=/var/www/html/protect-files public/ /var/www/html'
            }
        }
    }
}
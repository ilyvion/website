#!/bin/sh

# Instantly exits our script whenever an error occurs
set -e

# Pipe our environmental SSH key variable into a file
mkdir -p $HOME/.ssh
echo "${deploy_key}" > $HOME/.ssh/deploy_key
chmod 600 $HOME/.ssh/deploy_key # SSH keys need to be readonly

# Where to deploy our site on our server
target="/var/www/html"

# Grab exclusion file
sh -c "rsync -azvh -e 'ssh -i $HOME/.ssh/deploy_key -o StrictHostKeyChecking=no' ${deploy_target}:${target}/protect-files ."

# Ensure it got copied
[ -e protect-files ]

# The actual deployment
sh -c "rsync -azvh -e 'ssh -i $HOME/.ssh/deploy_key -o StrictHostKeyChecking=no' --delete --exclude-from=./protect-files public/ ${deploy_target}:${target}"

# Remove our deploy_key again since it's no longer needed
rm $HOME/.ssh/deploy_key
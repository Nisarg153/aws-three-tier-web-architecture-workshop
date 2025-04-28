#!/bin/bash
set -e

echo "Installing backend dependencies after deployment..."

# Fix permissions
sudo chown -R ec2-user:ec2-user /home/ec2-user/myapp

# Now install backend dependencies
cd /home/ec2-user/myapp/backend
npm install

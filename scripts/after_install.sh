#!/bin/bash
set -e

echo "Installing backend dependencies after deployment..."

# Check if npm exists
if ! command -v npm &> /dev/null
then
    echo "npm could not be found. Please install Node.js and npm."
    exit 1
fi

cd /home/ec2-user/myapp/backend
npm install

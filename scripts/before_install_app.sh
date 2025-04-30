#!/bin/bash

echo "Running App Tier BeforeInstall hook..."

# Clean previous app
rm -rf /home/ec2-user/app

# Create directory for app code
mkdir -p /home/ec2-user/app
chown ec2-user:ec2-user /home/ec2-user/app

#!/bin/bash

echo "Running Web Tier BeforeInstall hook..."

# Clean old build
rm -rf /home/ec2-user/web

# Create directory for new build
mkdir -p /home/ec2-user/web
chown ec2-user:ec2-user /home/ec2-user/web

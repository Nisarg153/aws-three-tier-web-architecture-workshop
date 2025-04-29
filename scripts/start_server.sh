#!/bin/bash
echo "Starting backend server with PM2..."
cd /home/ec2-user/application-code/app-tier
pm2 start index.js


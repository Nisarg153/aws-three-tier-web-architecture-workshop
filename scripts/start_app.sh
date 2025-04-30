#!/bin/bash

echo "Starting backend server with PM2..."
cd /home/ec2-user/app
pm2 start index.js --name app-tier || pm2 restart app-tier
pm2 save

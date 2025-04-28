#!/bin/bash
echo "Starting backend server with PM2..."
cd /home/ec2-user/myapp/backend
pm2 start index.js


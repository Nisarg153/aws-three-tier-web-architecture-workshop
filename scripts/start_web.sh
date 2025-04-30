#!/bin/bash

echo "Starting web server with serve..."
cd /home/ec2-user/web
npx serve -s . -l 80 > /dev/null 2>&1 &

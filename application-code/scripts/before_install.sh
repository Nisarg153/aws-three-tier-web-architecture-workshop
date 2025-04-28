#!/bin/bash
echo "Stopping existing Node.js servers if running..."
sudo pm2 stop all || true

#!/bin/bash
echo "Stopping existing Node.js servers if running..."
pm2 stop all || true

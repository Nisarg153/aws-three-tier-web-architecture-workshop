#!/bin/bash

echo "Stopping backend server..."
pm2 stop app-tier || true

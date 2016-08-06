#!/bin/bash

. /etc/profile
cd /opt/admin-portal-server
nvm use
node server.js

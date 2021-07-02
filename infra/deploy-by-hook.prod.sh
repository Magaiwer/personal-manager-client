#!/bin/sh
docker stop front-prod
docker system prune -f

docker run -p 80:80 -d  --name front-prod -e API_PORT=9002 magaiwer/personal-manager-client

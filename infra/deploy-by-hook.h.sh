#!/bin/sh
docker stop front-homolog
docker system prune -f
docker image rm -f magaiwer/personal-manager-client
docker-compose -f docker-compose.homolog.yaml up -d

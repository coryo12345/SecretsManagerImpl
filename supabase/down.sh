#!/bin/bash
docker-compose -f docker-compose.yml -f ./dev/docker-compose.dev.yml down -v --remove-orphans
echo "Deleting volume directory"
rm -r volumes/db/data
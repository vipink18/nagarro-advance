#!/bin/sh
# wait-for-redis.sh

until nc -z redis 6379; do
  echo "Waiting for Redis..."
  sleep 1
done

echo "Redis is up and running!"
exec java -jar app.jar
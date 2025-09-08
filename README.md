# nagarro-advance
advance nagarro project for learning purpose

Docker Setup and Management Guide
This guide explains the changes made to your Docker setup and provides commands to help you manage your application.

1. Multi-Stage Builds and Optimization
The Dockerfile in the backend directory has been updated to use a multi-stage build for a smaller and more secure final image.

Builder Stage (AS build): This stage is responsible for all build-time tasks, such as compiling your Java code with Maven.

Final Stage (FROM openjdk:17-jre-slim-buster): This stage creates the production image. It uses a lightweight JRE (Java Runtime Environment) image instead of the full JDK, significantly reducing the final image size. Only the essential app.jar file is copied from the builder stage.

To build the image, use the following command:

docker compose build --no-cache

2. Docker Network Management
A custom bridge network named my_app_network has been defined in docker-compose.yml. This allows services to communicate securely using their service names (postgres, redis, backend) as hostnames.

Check all networks on your system:

docker network ls

Inspect your custom network: This command shows you which containers are connected to the network.

docker network inspect my_app_network

(Optional) Clean up networks:

docker network prune

3. Docker Volume Management (Named Volumes and Bind Mounts)
Named volumes (postgres_data and redis_data) have been added to persist data. This means your data will not be lost when containers are stopped or removed.

a. Persist Data with Named Volumes
Named volumes are managed entirely by Docker. We use them for postgres and redis data to ensure persistence.

List all volumes:

docker volume ls

Inspect a specific volume:

docker volume inspect postgres_data

b. Backup and Restore Data from a Volume
To back up a volume, you can use a temporary container to access the volume's data and copy it to a local directory.

Create a backup:

docker run --rm --volumes-from postgres_data -v $(pwd):/backup ubuntu tar cvf /backup/postgres-backup.tar /var/lib/postgresql/data

This command mounts your local directory ($(pwd)) to the /backup directory inside a temporary ubuntu container. It then uses tar to archive the data from the postgres_data volume and save it to the mounted /backup directory.

Restore a backup:

docker run --rm --volumes-from postgres_data -v $(pwd):/backup ubuntu tar xvf /backup/postgres-backup.tar

4. Security Best Practices
a. Least Privilege User
The Dockerfile now creates a non-root user (appuser) and group (appgroup) and runs the application under this user. Running as a non-root user is a critical security practice that limits the damage an attacker can cause if they compromise the container.

b. Docker Secrets
The docker-compose.yml file uses Docker secrets to manage the database password. This is a much safer alternative to hardcoding the password in the YAML file or a properties file. The password is read from the secrets/db_password.txt file and injected into the container at runtime.

c. Vulnerability Scanning
You can use tools like Trivy or Snyk to scan your images for known vulnerabilities.

Install Trivy (if you haven't already): brew install aquasec/trivy/trivy (on macOS) or see the official Trivy docs.

Scan your backend image after building it:

docker compose build
trivy image <your_image_name>

d. Security Auditing with Docker Bench for Security
Docker Bench for Security is a script that checks your Docker host and containers against security best practices.

Run the audit script:

docker run --rm -it --net host --pid host --userns host --cap-add audit_control -e DOCKER_CONTENT_TRUST=$DOCKER_CONTENT_TRUST -v /var/lib:/var/lib -v /var/run/docker.sock:/var/run/docker.sock -v /usr/lib/systemd:/usr/lib/systemd -v /etc:/etc --label docker_bench_security docker/docker-bench-security

This command runs a temporary container that checks your environment and provides a detailed report of potential security weaknesses and suggestions for improvement.

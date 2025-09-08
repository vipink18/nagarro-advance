# Stage 1: Build Spring Boot app
FROM maven:3.9.4-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:17-jdk-alpine

WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

COPY wait-for-redis.sh .

RUN chmod +x wait-for-redis.sh

EXPOSE 8080

ENTRYPOINT ["./wait-for-redis.sh"]

#EXPOSE 8080
#
#ENTRYPOINT ["java", "-jar", "app.jar"]

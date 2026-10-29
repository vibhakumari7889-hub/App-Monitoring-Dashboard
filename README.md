# App Monitoring Dashboard

## Project Overview
This project monitors a Node.js application using Prometheus and Grafana.

## Technologies Used
- Node.js and Express
- Prometheus
- Grafana
- Docker and Docker Compose

## Features
- Application health monitoring
- HTTP request counting
- HTTP request duration metrics
- Prometheus metrics collection
- Grafana dashboard visualization

## Project Setup
1. Run `npm install` to install dependencies.
2. Run `npm start` to start the application.
3. Run `docker compose up -d` to start Prometheus and Grafana.

## Service URLs
- Application: http://localhost:3000
- Health Check: http://localhost:3000/health
- Metrics: http://localhost:3000/metrics
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001

## Monitoring Metrics
- `http_requests_total`: Total HTTP requests.
- `http_request_duration_seconds`: HTTP request duration.
- `up`: Application monitoring status.

## Conclusion
This project demonstrates application monitoring using Prometheus, Grafana, and Docker Compose.

# Cloud Curriculum - Express.js Microservices with Postgres, MongoDB, RabbitMQ, and Azure

Welcome to my **Cloud Curriculum** repository! This project showcases a microservices architecture implemented using **Express.js** and connected to various databases, including **PostgreSQL** and **MongoDB**. Additionally, it utilizes **RabbitMQ** as a message broker and is deployed on **Microsoft Azure** cloud platform.

## Table of Contents

1. <ins>Introduction</ins>
2. <ins>Services</ins>
3. <ins>Databases</ins>
4. <ins>Message Queue</ins>
5. <ins>Reverse Proxy</ins>
6. <ins>Deployment on Azure</ins>

## Introduction

This repository contains a practical implementation of a microservices-based application using **Express.js**, a popular Node.js framework. The application is split into four services, each with its specific functionality: **User Service**, **Product Service**, **Order Service**, and **Shipping Service**.

## Services

The application consists of the following services:

1. **User Service**:
   - Responsible for managing user-related operations.
   - Connected to **PostgreSQL** database to store and retrieve user information.

2. **Product Service**:
   - Handles product-related functionality.
   - Utilizes **MongoDB** to store and retrieve product data.

3. **Order Service**:
   - Manages order processing and fulfillment.
   - Connected to **PostgreSQL** database to store order details.
   - Publishes messages to **RabbitMQ** server for order processing.
   
4. **Shipping Service**:
   - Subscribes to **RabbitMQ** to receive order messages.
   - Handles shipping and delivery operations based on received messages.

## Databases

The application uses two databases to store data:

1. **PostgreSQL**:
   - Utilized by the **User Service** and **Order Service** to store user and order details respectively.

2. **MongoDB**:
   - Utilized by the **Product Service** to manage product-related information.

## Message Queue

The application employs **RabbitMQ** as a message broker to enable asynchronous communication between the services. The **Order Service** publishes messages to **RabbitMQ**, and the **Shipping Service** subscribes to the RabbitMQ server to receive and process those messages for shipping and delivery operations.

## Reverse Proxy

The repository also includes a configuration file for **Nginx**, serving as a reverse proxy. This setup helps manage incoming requests to the microservices and efficiently route them to the respective services based on their endpoints.

## Deployment on Azure

The entire application is deployed on the **Microsoft Azure** cloud platform. Azure provides a reliable and scalable infrastructure to host and manage the microservices. With the integration of Azure services, the application achieves high availability and excellent performance.

### Prerequisites

- Node.js and npm installed on your development machine.
- Docker for containerization
- Azure account and CLI configured 

Feel free to explore the codebase according to your requirements. If you encounter any issues or have questions, don't hesitate to open an issue in the repository.

Enjoy working with the Express.js microservices and cloud technologies!

Happy coding!
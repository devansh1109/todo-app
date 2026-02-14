# Todo List Application

A full-stack Todo List application built with Node.js, React, and PostgreSQL. This project demonstrates microservices architecture with containerization support for Docker and Kubernetes deployment.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Todo List Application                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────┐  │
│  │   Frontend   │◄────►│   Backend    │◄────►│ PostgreSQL│  │
│  │   (React)    │      │  (Node.js)   │      │ Database  │  │
│  │  Port: 30000 │      │  Port: 5000  │      │ Port: 5432│  │
│  └──────────────┘      └──────────────┘      └───────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```


## Prerequisites

- Docker
- Kubernetes (K3s/Minikube/Docker Desktop)
- Helm 3.x
- Node.js 16+ (for local development)


## How to install

Clone the repo:

``` bash
    git clone https://github.com/devansh1109/todo-app.git
```


Set Up Backend

cd backend

npm install

create a .env file in the backend directory with the following content:
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tododb
DB_USER=postgres
DB_PASSWORD=yourpassword

Set Up Frontend

cd ../frontend
npm install

Create a values-secret.yaml file under todo-chart root:

add the following content:

postgres:
  password: your-postgres-password


## How to run

In root directory (todo-app) run:

docker-compose build

helm install todo-app ./todo-chart \
-f ./todo-chart/values-secret.yaml \
-f ./todo-chart/values.yaml \
-n todo-app --create-namespace

## How to test

To test the application, you can use the following endpoints:
GET /api/todos - Get all todos
GET /health - Get health 

## How to run stress testing

After deployment, you can run stress testing using the following command:

In 1st terminal run:

kubectl get pods -n todo-app -w

In 2nd terminal run:

kubectl get hpa -n todo-app -w.  #To check for auto scaling of pods 

In 3rd terminal run:

jmeter -t "Graph Results.jmx"  #This runs the stress testing and opens a GUI 

jmeter -n -t "Graph Results.jmx"  #This will run the stress testing without GUI.
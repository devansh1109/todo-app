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


### Set Up Backend

``` bash
cd backend
npm install
```

### Create a .env file in the backend directory with the following content:

``` env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tododb
DB_USER=postgres
DB_PASSWORD=yourpassword
```

### Set Up Frontend

``` bash
cd ../frontend
npm install
```

### Create a values-secret.yaml file under todo-chart root:

Add the following content:

``` yaml
postgres:
  password: your-postgres-password
```

## How to run

In root directory (todo-app) run:

``` bash
#Build docker images
docker-compose build

#Deploy with helm
helm install todo-app ./todo-chart \
  -f ./todo-chart/values-secret.yaml \
  -f ./todo-chart/values.yaml \
  -n todo-app --create-namespace
```

Access the application at: http://localhost:30000

## How to test

To test the application, you can use the following endpoints:
- GET /api/todos - Get all todos
- GET /health - Get health 

### Example Request

```bash
# Get all todos
curl http://localhost:30000/api/todos

# Health check
curl http://localhost:30000/health
```

## How to run stress testing

After deployment, you can run stress testing using the following command:

**Terminal 1 - Watch pods**

``` bash
kubectl get pods -n todo-app -w
```

**Terminal 2 - Watch autoscaling of pods**
``` bash
kubectl get hpa -n todo-app -w  #To check for auto scaling of pods 
```
**Terminal 3 - Run load test**

### For Stress testing with GUI
``` bash
jmeter -t "Graph Results.jmx"  #This runs the stress testing and opens a GUI 
```

### For Stress testing without GUI
``` bash
jmeter -n -t "Graph Results.jmx"  #This will run the stress testing without GUI.
```

### Issues

-Persistent storage is applied for Docker images and not kubernetes.
-Once the kubernetes cluster is down the data of the session will be deleted
-Faced issues in creating persistent storage for a cluster session

## License

MIT License

Copyright (c) 2026 Devansh Verma

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for full details.
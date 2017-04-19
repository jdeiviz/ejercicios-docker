# Docker Swarm Mode

## Features

- Cluster management integrated with Docker Engine
- Decentralized design
- Declarative service model
- Scaling
- Desired state reconciliation
- Multi-host networking
- Service discovery
- Load balancing
- Secure by default
- Rolling updates

## Step1: Create machines

docker-machine create -d virtualbox --engine-env HTTP_PROXY=http://10.110.8.42:8080 --engine-env HTTPS_PROXY=http://10.110.8.42:8080 manager1

docker-machine create -d virtualbox --engine-env HTTP_PROXY=http://10.110.8.42:8080 --engine-env HTTPS_PROXY=http://10.110.8.42:8080 worker1

docker-machine create -d virtualbox --engine-env HTTP_PROXY=http://10.110.8.42:8080 --engine-env HTTPS_PROXY=http://10.110.8.42:8080 worker2

## Step2: Initialize Swarm

docker build -t docker-node-swarm .

docker swarm init --advertise-addr <manager-ip>

docker save -o docker-node-swarm.tar docker-node-swarm

## Step3: Join Nodes

docker swarm join-token worker

@FOR /f "tokens=*" %i IN ('docker-machine env worker1 --no-proxy') DO @%i

docker swarm join --token <token> <manager-ip:port>

docker load -i docker-node-swarm.tar

## Step4: Create Service

@FOR /f "tokens=*" %i IN ('docker-machine env manager1 --no-proxy') DO @%i

docker service create --replicas 4 -p 3000:3000 --name nodejs docker-node-swarm

## Step5: Change State

docker service scale nodejs=2

## Step6: Rolling Update

Change index.js

docker build -t docker-node-swarm:v2 .

docker service update --image docker-node-swarm:v2 nodejs

## Step7: Drain node

docker node update --availability drain worker1

docker node update --availability active worker1

docker service scale nodejs=2

## Future Steps:

- Visualizer

docker run -it -d -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock manomarks/visualizer

- Create overlay Network services

docker network create --driver overlay --subnet 10.0.9.0/24 --opt encrypted nodejs-network

docker service create --replicas 4 -p 3000:3000 --name nodejs --network my-network docker-node-swarm 
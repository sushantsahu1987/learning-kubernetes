# learning-kubernetes
Learning kubernetes one hour at a time

## 1. kube-node-101
### production
    docker build -t sushantsahu/kube-node-101 -f Dockerfile
    docker run -i -p 80:3000 -t sushantsahu/kube-node-101

### dev/debug
    docker run -i -v "$PWD"/package.json:/tmp/package.json -v "$PWD"/node_modules_linux:/tmp/node_modules -w /tmp -t node:10 npm install</
    docker build -t sushantsahu/kube-node-101-tools -f Dockerfile-tools .
    docker run -i -p 3000:3000 -v "$PWD"/:/app -v "$PWD"/node_modules_linux:/app/node_modules -t sushantsahu/kube-node-101-tools /bin/run-dev

### production:slim
    docker build -t sushantsahu/kube-node-101-run -f Dockerfile-run .
    docker run -d -p 80:3000 -t sushantsahu/kube-node-101-run

### Publish images to docker hub

#### Prod
    docker tag sushantsahu/kube-node-101 sushantsahu/kube-node-101:1.0.0
    docker push sushantsahu/kube-node-101:1.0.0


#### Tooling
    docker tag sushantsahu/kube-node-101-tools sushantsahu/kube-node-101-tools:1.0.0
    docker push sushantsahu/kube-node-101:1.0.0

#### Prod Slim
    docker tag sushantsahu/kube-node-101-run sushantsahu/kube-node-101-run:1.0.0
    docker push sushantsahu/kube-node-101-run:1.0.0

### kubernetes: helm
    helm install kube-101 chart/kube-101
    helm list --all
    helm status kube-101
    helm history kube-101
    helm rollback kube-101 <revision_no>
    helm upgrade --install kube-101 chart/kube-101

    export SAMPLE_NODE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services kube-101-service)
    export SAMPLE_NODE_IP=$(kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}")
    kubectl get pods
    kubectl get services

### Prometheus
    helm repo add stable https://kubernetes-charts.storage.googleapis.com
    helm repo update
    helm install prometheus stable/prometheus
    
    The Prometheus server can be accessed via port 80 on the following DNS name from within your cluster:
    prometheus-server.default.svc.cluster.local
    export POD_NAME=$(kubectl get pods --namespace default -l "app=prometheus,component=server" -o jsonpath="{.items[0].metadata.name}")

### Grafana
    helm install grafana stable/grafana --set adminPassword=ASDEF@123
    export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=grafana,app.kubernetes.io/instance=grafana" -o jsonpath="{.items[0].metadata.name}")
    kubectl --namespace default port-forward $POD_NAME 3000
    

### Reference
    https://github.com/CloudNativeJS/docker
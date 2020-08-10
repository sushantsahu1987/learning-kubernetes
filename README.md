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
    docker tag sushantsahu/kube-node-101 sushantsahu/kube-node-101-run:1.0.0
    docker push sushantsahu/kube-node-101-run:1.0.0

### kubernetes: helm
    helm install kube-101 chart/kube-101
    helm list --all
    helm status kube-101
    helm history kube-101
    helm rollback kube-101 <revision_no>

    kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services kube-101-service
    kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}"
    kubectl get services
    kubectl get pods

    

### Reference
    https://github.com/CloudNativeJS/docker
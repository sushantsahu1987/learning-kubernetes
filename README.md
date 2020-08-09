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
    docker tag sushantsahu/kube-node-101 sushantsahu/kube-node-101:1.0.0
    docker push sushantsahu/kube-node-101:1.0.0

#### Prod Slim
    docker tag sushantsahu/kube-node-101 sushantsahu/kube-node-101:1.0.0
    docker push sushantsahu/kube-node-101:1.0.0

### Reference
    https://github.com/CloudNativeJS/docker
# learning-kubernetes
Learning kubernetes one hour at a time

<h2>1. kube-node-101</h2>
<h3>production<h3>
<ul>
    <li> docker build -t sushantsahu/kube-node-101 -f Dockerfile </li>
    <li> docker run -i -p 80:3000 -t sushantsahu/kube-node-101 <li>
</ul>
<h3>dev/debug<h3>
<ul>
    <li>docker run -i -v "$PWD"/package.json:/tmp/package.json -v "$PWD"/node_modules_linux:/tmp/node_modules -w /tmp -t node:10 npm install</li>
    <li>docker build -t sushantsahu/kube-node-101-tools -f Dockerfile-tools . </li>
    <li>docker run -i -p 3000:3000 -v "$PWD"/:/app -v "$PWD"/node_modules_linux:/app/node_modules -t sushantsahu/kube-node-101-tools /bin/run-dev<li>
</ul>

<h3>production:slim<h3>
<ul>
    <li>docker build -t sushantsahu/kube-node-101-run -f Dockerfile-run .</li>
    <li>docker run -d -p 80:3000 -t sushantsahu/kube-node-101-run
</ul>

<label>docker login</label>
<h3>publish prod image to docker<h3>
<ol>
    <ul>        
        <li>docker tag sushantsahu/kube-node-101 sushantsahu/kube-node-101:1.0.0</li>
        <li>docker push sushantsahu/kube-node-101:1.0.0</li>
    </ul>
</ol>

<h3>publish tooling image to docker<h3>
<ol>
    <ul>        
        <li>docker tag sushantsahu/kube-node-101 sushantsahu/kube-node-101:1.0.0</li>
        <li>docker push sushantsahu/kube-node-101:1.0.0</li>
    </ul>
</ol>

<h3>publish prod:slim image to docker<h3>
<ol>
    <ul>        
        <li>docker tag sushantsahu/kube-node-101 sushantsahu/kube-node-101:1.0.0</li>
        <li>docker push sushantsahu/kube-node-101:1.0.0</li>
    </ul>
</ol>


<h3>Reference</h3>
<ol>
    <li>https://github.com/CloudNativeJS/docker</li>
</ol>
# Running OSNMA web interface dashboard using Docker
1. Clone repo
```bash
git clone https://github.com/buildvoc/OSNMA.git
```
2. Checkout to deployment-branch
```bash 
git checkout docker-deployment
```
3. Go to /web-example directory
```bash 
cd web-example
```
4. Run the container
```bash
docker-compose up -d
```
5. Open localhost url
http://localhost for dashboard and http://localhost/subframe-input for dashboard input log


----
## Updating log data
Public Docker volumes exists inside ```/web-example/public``` dir. Inside this dir, we have ```status_log.json```. We only need to update this file, so the web UI dashboard data will automatically renewed.

Note: [This link](https://osnmalib.eu/json-schema) show the status_log.json schema.

# Building as Docker images
These steps show how to build as Docker images. The Dockerfile exists inside web directory.
1. Clone repo:
```bash
git clone https://github.com/buildvoc/OSNMA.git
```
2. Checkout to deployment-branch
```bash 
git checkout docker-deployment
```
3. Go to /web directory
```bash 
cd web
```
4. Build as docker images
```bash
docker build -t subframe-dashboard .
```

# Building as Docker images for dashboard input
These steps show how to build as Docker images. The Dockerfile exists inside web directory.
1. Clone repo:
```bash
git clone https://github.com/buildvoc/OSNMA.git
```
2. Checkout to deployment-branch
```bash 
git checkout docker-deployment
```
3. Go to /web-input directory
```bash 
cd web-input
```
4. Build as docker images
```bash
docker build -t subframe-input .
```
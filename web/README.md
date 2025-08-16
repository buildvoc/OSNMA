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
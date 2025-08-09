
# 🚀 Project: OSNMA-WebDocker

This guide shows how to combine OSNMAlib with a lightweight web dashboard using Docker, NGINX, and local file output from Android logs or `.pbf` files.

---

## 🧱 Folder Structure

```
OSNMA-WebDocker/
├── docker-compose.yml
├── osnmalib/
│   └── osnmalib.py, ...
├── web/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── data/
│       ├── osnma_subframe.json   ← output from OSNMAlib
```

---

## 🐳 docker-compose.yml

```yaml
version: '3.9'

services:
  osnmalib:
    build:
      context: ./osnmalib
    volumes:
      - ./web/data:/data
    command: >
      python osnmalib.py
      --input-file /data/log.csv
      --json-log /data/osnma_subframe.json
      --verbose

  webserver:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./web:/usr/share/nginx/html:ro
```

---

## ▶️ How to Run

```bash
docker-compose up --build
```

- OSNMAlib runs once and saves output into `/web/data`
- NGINX serves the HTML dashboard on: [http://localhost:8080](http://localhost:8080)

---

## 🌐 HTML Dashboard (Based on OSNMAlib.html)

Place `OSNMAlib.html` as:

```
web/index.html
```

Ensure your JavaScript loads the data from:

```javascript
fetch("data/osnma_subframe.json").then(response => ...)
```

---

## 🧾 Data File Example

- `osnma_subframe.json` = OSNMAlib's structured subframe authentication log
- You can create this by running:

```bash
python osnmalib.py \
  --input-file log.txt \
  --json-log web/data/osnma_subframe.json
```

---

## 📁 Access the Web App

Open:

```
http://localhost:8080
```

To view the dashboard visualizing authenticated subframes, HKROOT keys, and satellite status.

---

---

## 🔐 OSNMA Public Key and Merkle Tree Volumes

To run OSNMAlib with signature verification, mount these XML files into the container:

### 📁 Required Files

- `OSNMA_PublicKey_1.xml`
- `OSNMA_MerkleTree.xml`

Place them in a shared directory, e.g.:

```
./web/data/OSNMA_PublicKey_1.xml
./web/data/OSNMA_MerkleTree.xml
```

### 🐳 Updated docker-compose.yml

```yaml
  osnmalib:
    build:
      context: ./osnmalib
    volumes:
      - ./web/data:/data
    command: >
      python osnmalib.py
      --input-file /data/log.csv
      --json-log /data/osnma_subframe.json
      --auth-material /data/OSNMA_MerkleTree.xml
      --public-key /data/OSNMA_PublicKey_1.xml
      --verbose
```

This ensures OSNMAlib reads both XML files for public key and authentication material.

---

## 📍 Full Run Example

```bash
docker-compose up --build
```

Then visit:

```
http://localhost:8080
```

To visualize the authenticated Galileo OSNMA results.

---

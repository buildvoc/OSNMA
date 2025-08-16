
# 🎥 Developer Task – OSNMAlib Web Dashboard Demonstration

## 📌 Objective
Create a **screen recording** that demonstrates the end-to-end flow of using **OSNMAlib with Docker on Windows**, adding a **GeoLogger (GnssLogger) App log**, and visualizing the **OSNMA authentication results** in the web dashboard.  
Additionally, update the project’s **README.md** to document Docker deployment steps.

---

## 📝 Task Steps

### 1. Windows Docker Setup
- Record installing & launching **Docker Desktop for Windows**.
- Show pulling/building the **OSNMAlib Docker container**:
  ```bash
  docker-compose up --build
  ```
- Highlight volumes mapping (`./web/data:/data`) and where logs will be stored.

### 2. Adding GeoLogger App Log
- Export a log file (`.txt` or `.csv`) from the **Google GeoLogger (GnssLogger)** app.
- Copy it into the project folder:
  ```
  ./web/data/log.csv
  ```
- Ensure `OSNMA_PublicKey_1.xml` and `OSNMA_MerkleTree.xml` are also present in the same directory.
- Restart Docker service to process the new input file:
  ```bash
  docker-compose up
  ```

### 3. Showing Results in Web Dashboard
- Open a browser and navigate to:
  ```
  http://localhost:8080
  ```
- Show the **dashboard interface**:
  - OSNMA subframes decoded (`MessageId=1537, SubId=4–7`)
  - JSON results in `/web/data/osnma_subframe.json`
  - Visual graphs (satellite status, authenticated subframes, HKROOT chain)
- Confirm successful OSNMA message authentication.

---

## 📘 README Update Task
Update the repository **README.md** at:  
👉 https://github.com/buildvoc/OSNMA/blob/docker-deployment/README.md  

### Required Additions
- Step-by-step **Docker deployment instructions**:
  - Clone repo
  - Place GeoLogger log + XML files in `./web/data/`
  - Run `docker-compose up --build`
  - Access web dashboard on `http://localhost:8080`
- Example usage with sample GeoLogger log
- Notes on required OSNMA files:
  - `OSNMA_PublicKey_1.xml`
  - `OSNMA_MerkleTree.xml`

---

## 📽️ Deliverables
- **Screen Recording** (mp4, 1080p or higher) showing all steps above.
- **Sample log file** used in the demo.
- Updated **README.md** in the Docker deployment repo.
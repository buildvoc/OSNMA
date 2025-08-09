
# 🛰️ OSNMAlib with Android GnssLogger App – Tutorial

This tutorial shows how to use [OSNMAlib](https://github.com/Algafix/OSNMA) to verify Galileo OSNMA messages collected using the [Google GnssLogger App](https://play.google.com/store/apps/details?id=com.google.android.apps.location.gps.gnsslogger).

---

## ✅ Requirements

- Android phone with GNSS raw access and Galileo E1B support
- **GnssLogger App** (Google)
- **OSNMAlib** (Python)
- `.txt` log file exported from GnssLogger
- Outdoor logging session (5–10 minutes) with good sky view

---

## 📥 Step 1: Record Galileo OSNMA Data on Android

1. Open GnssLogger on your device.
2. Ensure you have a clear sky view and Galileo enabled.
3. Start logging and wait 5–10 minutes.
4. Stop and export the `.txt` file to your computer.

---

## 📦 Step 2: Identify OSNMA Navigation Messages

OSNMA data is broadcast in **Galileo I/NAV word types 4–7**.

Search in the log for:

- `MessageId = 1537` (Galileo I/NAV)
- `SubmessageId = 4`, `5`, `6`, `7` (OSNMA WTs)

Example:
```
Nav,12345678,33,1537,5,AB12CD34EF...
```

---

## 🧰 Step 3: Prepare OSNMAlib Input Format

Each message must include:

- `SVID` (e.g., 33)
- `MessageId = 1537`
- `SubmessageId = 4–7`
- `Data` (29 bytes = 228 bits)
- UTC timestamp (reconstructed from log if needed)

---

## 🧪 Step 4: Run OSNMAlib

Clone the repo and run:

```bash
python3 osnmalib.py \
  --input-source android_gnsslogger \
  --input-file my_android_log.txt \
  --json-log osnma_output.json \
  --verbose
```

Optional:
- `--dump-pages` shows full I/NAV decoding
- `--log-format raw` for log-style output

---

## 🔍 Step 5: Analyze the Output

Your results will show:
- `OSNMA MACK tags`
- `TESLA keys`
- `Authentication status`
- Valid WTs and authentication results (ADKD0, 2, 12)

---

## 📚 References

- [OSNMAlib GitHub](https://github.com/Algafix/OSNMA)
- [Galileo ICD v2.1](https://www.gsc-europa.eu/sites/default/files/sites/all/files/Galileo-OS-SIS-ICD.pdf)
- OSNMAlib Paper: _Improving OSNMAlib: New Formats, Features and Monitoring Capabilities_

# Objectives

| ID | What is measured | How | Target | Conditions | Not included |
|---|---|---|---|---|---|
| MO-1 | Median latency of the per class counts endpoint | 5 runs with curl, take the median of the 5 response times | Median at or below 200 ms | CPU Intel(R) Core(TM) i7-8665U @ 1.90GHz; RAM 16 GB; OS Microsoft Windows 11 Pro; CVAT commit SHA 8d7ae755c5b8de82e8711756b35c0207655ef1ae; 300 images (COCO val2017 subset, full instances_val2017.json) | Cold-start first request is one of the 5 runs, not discarded; no load testing or concurrent requests; no WebSocket paths |

## Results

| Run | Latency (ms) |
|---|---|
| 1 | |
| 2 | |
| 3 | |
| 4 | |
| 5 | |
| Median | |

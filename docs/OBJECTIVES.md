# Objectives

| ID | What is measured | How | Target | Conditions | Not included |
|---|---|---|---|---|---|
| MO-1 | Median latency of the per class counts endpoint | 5 runs with curl, take the median of the 5 response times | Median at or below 200 ms | CPU Intel(R) Core(TM) i7-8665U @ 1.90GHz; RAM 16 GB; OS Microsoft Windows 11 Pro; CVAT commit SHA 8d7ae755c5b8de82e8711756b35c0207655ef1ae; 300 images (COCO val2017 subset, full instances_val2017.json) | Cold-start first request is one of the 5 runs, not discarded; no load testing or concurrent requests; no WebSocket paths |

## Results

Command: `curl -s -o /dev/null -u <user>:<pass> -w "%{time_total}\n" http://localhost:8080/api/test/label-counts/1`, task 1 (300 images, 80 labels, 2401 annotations). Raw output is in [item6-speed-raw.txt](item6-speed-raw.txt).

| Run | time_total (s) | Latency (ms) |
|---|---|---|
| 1 | 1.852284 | 1852 |
| 2 | 1.455075 | 1455 |
| 3 | 1.675357 | 1675 |
| 4 | 1.350144 | 1350 |
| 5 | 1.476751 | 1477 |
| Median | 1.476751 | 1477 |

Spread: min 1350 ms, max 1852 ms, range 502 ms.

**Target missed.** The median of 1477 ms is about 7 times the 200 ms target. The first run (1852 ms) was the slowest and was not discarded.

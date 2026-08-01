# Grafana & Prometheus Monitoring Dashboard Documentation

## Overview
This dashboard provides real-time visibility into **Node.js application performance** and **infrastructure health** using data collected by **Prometheus** and visualized in **Grafana**. It focuses on critical resource utilization metrics to ensure system stability and detect memory leaks or bottlenecks early.

---

## Panel Descriptions

### 1. Node.js External Memory Usage
- **Metric**: `nodejs_external_memory_bytes`
- **Description**: Displays the amount of memory allocated by the Node.js process for C++ objects, buffers, and other external resources not managed directly by the V8 garbage collector.
- **Why It Matters**: A steady increase in this value without dropping may indicate a memory leak in native addons or large buffer allocations.
- **Visualization**: Gauge (Unit: Bytes)
- **Thresholds**:
  - 🟢 **Green**: Normal operation (< 80% of limit)
  - 🟡 **Yellow**: Warning zone (80% - 90%)
  - 🔴 **Red**: Critical (> 90% or specific byte limit)

### 2. CPU Usage Percentage
- **Metric**: `node_cpu_seconds_total` (Calculated)
- **Description**: Shows the current CPU utilization of the host machine. Calculated as `100 - idle_percentage`.
- **Why It Matters**: High CPU usage can lead to slow response times and application timeouts.
- **Visualization**: Gauge (Unit: Percent)

### 3. Memory Usage Percentage
- **Metric**: `node_memory_MemAvailable_bytes` & `node_memory_MemTotal_bytes`
- **Description**: Represents the percentage of total system RAM currently in use.
- **Why It Matters**: Ensures the server has enough free memory to handle load spikes without swapping to disk.
- **Visualization**: Gauge (Unit: Percent)

### 4. Disk Space Utilization
- **Metric**: `node_filesystem_avail_bytes` & `node_filesystem_size_bytes`
- **Description**: Indicates how much disk space is used on the primary partition.
- **Why It Matters**: Prevents disk full errors which can crash databases and stop logging.
- **Visualization**: Gauge (Unit: Percent)

### 5. Active HTTP Requests
- **Metric**: `http_requests_total` (Rate)
- **Description**: Displays the current number of HTTP requests per second the application is handling.
- **Why It Matters**: Helps correlate high memory/CPU usage with traffic spikes.
- **Visualization**: Gauge (Unit: Requests/sec)

---

## How to Use
1. **Monitor Trends**: Check gauges regularly. Values consistently in the **Yellow** or **Red** zones require immediate investigation.
2. **Correlate Metrics**: If **External Memory** is high, check **Active HTTP Requests** to see if it's traffic-related or a leak.
3. **Alerting**: These panels are designed to be linked with Grafana Alerts to notify the team via Slack/Email when thresholds are breached.

---

## Technical Stack
- **Data Source**: Prometheus
- **Visualization**: Grafana
- **Exporters**: Node Exporter (System), Prometheus Node.js Client (Application)   
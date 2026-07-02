# Grafana Installation and Setup Guide

Follow these steps to download, install, and configure Grafana Open Source Software (OSS) on your local machine.

## 1. Download Grafana

1. Navigate to the official Grafana download page: [https://grafana.com/grafana/download?edition=oss](https://grafana.com/grafana/download?edition=oss)
2. Ensure the **OSS** (Open Source Software) edition is selected.
3. Select your operating system from the tabs provided:
   - **Windows**
   - **macOS**
   - **Linux** (Choose your distribution, e.g., Ubuntu, Debian, RPM)
4. Click the **Download** button to get the installer or package.

## 2. Installation

### Windows

1. Run the downloaded `.msi` installer.
2. Click **Next** through the setup wizard (accept defaults).
3. Click **Install** and then **Finish**.

> **Note:** Grafana runs as a background service. It does **not** create a desktop icon or start menu shortcut automatically.

### macOS / Linux

- Follow the specific package manager instructions provided on the download page (e.g., `brew install grafana` for macOS or `apt-get install grafana` for Ubuntu).

## 3. Verify the Service Is Running

Since Grafana runs as a background service, verify it is active before accessing the UI.

### On Windows

1. Press `Win + R`, type `services.msc`, and hit Enter.
2. Locate **Grafana** in the list.
3. Ensure the **Status** column shows **Running**.
   - If not, right-click and select **Start**.

### On Linux / macOS

Open your terminal and run:

```bash
# Systemd (Linux)
sudo systemctl status grafana-server

# Homebrew (macOS)
brew services list | grep grafana
```

## 4. Access Grafana

1. Open your web browser.
2. Navigate to the default localhost URL: [http://localhost:3000](http://localhost:3000)

## 5. Initial Login & Configuration

1. You will be presented with the login screen.
2. Enter the default credentials:
   - **Username:** `admin`
   - **Password:** `admin`
3. Click **Log in**.
4. You will be prompted to set a **new password**. Enter a secure password and confirm it.
5. Click **Save** or **Submit**.

## 🎉 Setup Complete

You are now logged into your local Grafana instance and ready to add data sources and create dashboards!
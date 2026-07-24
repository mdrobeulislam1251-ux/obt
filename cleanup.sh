#!/bin/bash
# Full server cleanup script for RunPod
# Run as: bash cleanup.sh

set -e
echo "========================================="
echo "  RunPod Server Cleanup"
echo "========================================="

# 1. System check first
echo ""
echo "[1/7] Current system state..."
echo "--- GPU ---"
nvidia-smi
echo ""
echo "--- RAM ---"
free -h
echo ""
echo "--- Disk ---"
df -h /
echo ""
echo "--- CPU ---"
echo "Cores: $(nproc)"

# 2. Show all running services
echo ""
echo "[2/7] Running processes (top 30 by memory)..."
ps aux --sort=-%mem | head -30

# 3. Stop vLLM if running
echo ""
echo "[3/7] Stopping vLLM..."
pkill -f vllm 2>/dev/null && echo "vLLM stopped" || echo "vLLM not running"

# 4. Stop Ollama if running
echo ""
echo "[4/7] Stopping Ollama..."
systemctl stop ollama 2>/dev/null || pkill -f ollama 2>/dev/null && echo "Ollama stopped" || echo "Ollama not running"

# 5. Stop any Jupyter notebooks
echo ""
echo "[5/7] Stopping Jupyter..."
pkill -f jupyter 2>/dev/null && echo "Jupyter stopped" || echo "Jupyter not running"

# 6. Stop any other common AI services
echo ""
echo "[6/7] Stopping other services..."
pkill -f "text-generation" 2>/dev/null && echo "TGI stopped" || true
pkill -f "tritonserver" 2>/dev/null && echo "Triton stopped" || true
pkill -f "uvicorn" 2>/dev/null && echo "Uvicorn stopped" || true
pkill -f "gunicorn" 2>/dev/null && echo "Gunicorn stopped" || true

# 7. Clean up temp files and caches
echo ""
echo "[7/7] Cleaning caches..."
pip cache purge 2>/dev/null || true
apt-get clean 2>/dev/null || true
rm -rf /tmp/* 2>/dev/null || true
rm -rf /root/.cache/huggingface/hub/*.tmp* 2>/dev/null || true

# Final state
echo ""
echo "========================================="
echo "  Cleanup Complete - Final State"
echo "========================================="
echo "--- GPU ---"
nvidia-smi
echo ""
echo "--- RAM ---"
free -h
echo ""
echo "--- Disk ---"
df -h /
echo ""
echo "--- Remaining processes ---"
ps aux --sort=-%mem | head -15
echo ""
echo "Server is clean. Ready for fresh setup."

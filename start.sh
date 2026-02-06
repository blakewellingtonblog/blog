#!/bin/bash

# Start both frontend and backend dev servers
# Usage: ./start.sh from the project root

# Kill background processes on exit
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null
    exit 0
}
trap cleanup SIGINT SIGTERM

# Start backend
echo "Starting backend (FastAPI on port 8000)..."
cd backend && source venv/bin/activate && uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

# Give backend a moment to start
sleep 1

# Start frontend (runs in foreground so you see Vite output)
echo "Starting frontend (Vite on port 5173)..."
cd frontend && npm run dev

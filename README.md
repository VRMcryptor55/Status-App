# 📊 Status Page Application

A fullstack web application that allows administrators to manage and monitor the status of various services (e.g., AWS, API, Database), while customers can view real-time service status and history.

## ✨ Features

### 👨‍💻 Admin
- Register and login
- Create, update, and delete services
- Set status: `Operational`, `Degraded Performance`, `Partial Outage`, `Major Outage`
- View status change history for each service
- Real-time WebSocket updates

### 👤 Customer
- Register and login
- View current service statuses
- View status change history
- Receive real-time status updates

## 📁 Project Structure
-backend->src
-frontend->vite-project->src

## Backend Setup
-go to backend folder and open that folder with code 

-In terminal write the following codes

  npm install,
  
  npm run start:dev,
-I have already added the .env file . It's just for demo

## Frontend Setup
go to frontend folder and then open the vite-project folder with code
In terminal write the following codes
  npm install
  npm run dev

Frontend will run on http://localhost:5173
Backend will run on http://localhost:5000

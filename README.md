# Meeting Room Web Application

A real-time video conferencing application built with **Next.js**, **Stream Video API**, **Clerk Authentication**, **Tailwind CSS**, and **TypeScript**. This application allows users to join video calls, mute/unmute their microphone, toggle video on/off, and manage participants in real-time.

## Features

- Real-time video conferencing with customizable video tiles.
- Microphone and camera controls (Mute/Unmute, Video On/Off).
- Participant view with placeholders and real-time updates.
- Integration with **Clerk** for user authentication.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (version >= 14.x.x)
- **npm** or **Yarn** (package manager)
- **TypeScript** (if not already installed globally)

## Installation

### Step 1: Clone the repository

```bash
git clone https://github.com/your-repo/meeting-room-app.git
cd meeting-room-app
```

### Step 2: install the deps

```bash
npm install
# or if you prefer yarn
yarn install
```


### Step 3: Set up Environment Variables
Create a .env.local file at the root of the project and add the following environment variables. These are required for Clerk authentication and the Stream API.

You can find your Clerk API keys and Stream API keys in their respective dashboards:

Clerk: `Clerk Dashboard`
Stream: `Stream Dashboard`
```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
CLERK_API_KEY=<your-clerk-api-key>
CLERK_API_URL=<your-clerk-api-url>

# Stream API
NEXT_PUBLIC_STREAM_API_KEY=<your-stream-api-key>
NEXT_PUBLIC_STREAM_APP_ID=<your-stream-app-id>

```



### Step 6: Run the Development Server
After setting up the environment variables, you can now run the development server:
```bash
npm run dev
# or if using yarn
yarn dev
```

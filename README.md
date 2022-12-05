# Meditation App

Hi, this is the meditation app made with React Native (for the frontend) and Nest.js (for the backend). It is a simple app that allows you to meditate for a certain amount of time. It is a work in progress, so there are some bugs and some features that are not implemented yet. The app is still in development, so please be patient. You are welcome to contribute to the project.

# Design Idea

The design of this application is inspired by the design of the [Meditation App](https://www.figma.com/community/file/989440009103274622) by [@aide](https://www.figma.com/@aide), shoutout to him for the design.

# Installation

```bash
git clone https://github.com/bhattaraijay05/meditation.git
cd meditation
```

# Get the local ip address of your device

```bash
node ip.js
# This IP address is required to run the backend server, which we will use to connect to the frontend.
```

# Backend Configuration

```bash
cd backend
yarn install

#Extra Steps
#Confuguring the IP Address

-Go To src/main.ts
Change the HOST IP Address to your local IP Address (that you got from the ip.js file)

-Go To src/app.module.ts
Change the MongoDB URL to your own MongoDB URL (or use the default one)

yarn start
```

# Frontend Configuration

```bash
cd frontend
yarn install


#Extra Steps
#Confuguring the IP Address

-Go To App.tsx
Change the HOST IP Address to your local IP Address (that you got from the ip.js file)

yarn android # For Android
yarn ios # For IOS
```

# Dockerizing the backend

```bash
cd backend
yarn docker
```

# Screenshots and Images

<img src="https://raw.githubusercontent.com/bhattaraijay05/meditation/main/static/backend.png"/>

<div style="display:flex; flex-wrap:wrap; justify-content:space-between">
<img src="https://raw.githubusercontent.com/bhattaraijay05/meditation/main/static/ui1.png" width="200px" style="margin:20px" />

<img src="https://raw.githubusercontent.com/bhattaraijay05/meditation/main/static/ui2.png" width="200px"  style="margin:20px"/>

<img src="https://raw.githubusercontent.com/bhattaraijay05/meditation/main/static/ui3.png" width="200px"  style="margin:20px"/>

<img src="https://raw.githubusercontent.com/bhattaraijay05/meditation/main/static/ui4.png" width="200px"  style="margin:20px"/>

<img src="https://raw.githubusercontent.com/bhattaraijay05/meditation/main/static/ui5.png" width="200px"  style="margin:20px"/>

<img src="https://raw.githubusercontent.com/bhattaraijay05/meditation/main/static/ui6.png" width="200px"  style="margin:20px"/>



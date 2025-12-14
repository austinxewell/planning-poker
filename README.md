# AuEwellify Planning Poker

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-brightgreen)](https://auewellifyplanningpoker.netlify.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub%20Repo-View-blue)](https://github.com/austinxewell/planning-poker)
[![MIT License](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)
![Nuxt 3](https://img.shields.io/badge/Nuxt-3.x-00DC82?style=flat-square&logo=nuxt.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Utility--First-38bdf8?style=flat-square&logo=tailwindcss)

**AuEwellify Planning Poker** is a real-time agile estimation tool built to support collaborative sprint planning using Planning Poker techniques. Distributed teams can estimate stories together with live synchronization and minimal friction.

This project lives in a **single repository**, while the **frontend and backend are deployed separately**, mirroring a real-world production architecture.

---

## 🔗 Live Demo

https://auewellifyplanningpoker.netlify.app/

---

## 📦 About the Project

**AuEwellify Planning Poker** modernizes the traditional Planning Poker workflow used by agile teams. Users can create or join planning sessions, submit estimates privately, and reveal votes simultaneously in real time.

### Key Capabilities

- Real-time vote synchronization across participants
- Private estimation with controlled reveal
- Session-based planning rooms
- Clean, distraction-free UI optimized for live meetings

### Architecture Overview

- **Frontend:** Nuxt 3 application deployed to Netlify
- **Backend:** Express + Socket.IO server deployed independently
- **Communication:** WebSockets for real-time updates
- **Repository Structure:** Single repository with separate frontend and backend packages

---

## 🛠 Tech Stack & Features

| Technology / Feature | Purpose / Description                           |
| -------------------- | ----------------------------------------------- |
| Nuxt 3               | Frontend framework with SSR and Composition API |
| Vue 3                | Reactive UI layer                               |
| TypeScript           | Type safety and maintainability                 |
| JavaScript (Node)    | Backend runtime                                 |
| Tailwind CSS         | Utility-first styling                           |
| Pinia                | Frontend state management                       |
| Express              | Lightweight backend server                      |
| Socket.IO            | Real-time bidirectional communication           |
| Axios                | HTTP client                                     |
| dotenv               | Environment variable management                 |
| Real-Time Sessions   | Live planning rooms                             |
| Vote Reveal Logic    | Controlled estimate reveal                      |
| Responsive UI        | Optimized for desktop and tablet use            |

---

## 📸 Screenshots

| Dark Mode                                                          | Light Mode                                                          |
| ------------------------------------------------------------------ | ------------------------------------------------------------------- |
| ![](https://i.postimg.cc/5YMxMWxy/Planning_Poker_Landing_Dark.png) | ![](https://i.postimg.cc/CBVFVpFR/Planning_Poker_Landing_Light.png) |
| ![](https://i.postimg.cc/TLXRXvR2/Planning_Poker_Session_Dark.png) | ![](https://i.postimg.cc/S2pypbyK/Planning_Poker_Session_Light.png) |

---

## 🚀 Getting Started

This project contains **separate frontend and backend packages** within a single repository.

### Clone the Repository

    git clone https://github.com/austinxewell/planning-poker.git
    cd planning-poker

### Frontend Setup

    cd frontend
    npm install
    npm run dev

### Backend Setup

    cd backend
    npm install
    npm run dev

### Environment Variables

Create `.env` files in both the `frontend` and `backend` directories as required (for example, API URLs and ports).

---

## 🌐 Deployment Notes

- Frontend is deployed to **Netlify**
- Backend is deployed as a standalone **Node.js** service
- Real-time communication is handled via **Socket.IO**

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch

   git checkout -b feature/your-feature

3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License.  
See the MIT License for more information:  
https://opensource.org/licenses/MIT

---

## 🙏 Acknowledgements

- Nuxt 3 & Vue 3 ecosystem
- Socket.IO for real-time communication
- Tailwind CSS for styling
- Express for backend simplicity

---

## 👨‍💻 Author

**Austin Ewell**  
Front End Developer  
GitHub: https://github.com/austinxewell

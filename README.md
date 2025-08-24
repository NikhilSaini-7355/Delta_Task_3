# DTunes Project Architecture

## 1. Frontend (DTunes-Frontend)

**Tech Stack:**  
- React.js (SPA)
- Vite (build tool, HMR)
- React Router (routing)
- Tailwind CSS + custom CSS (styling)
- Howler.js (audio playback)
- Cloudinary widget (media upload)
- Context API + hooks (`useState`, `useEffect`)

**Structure:**  
- `/src/App.jsx`: Main app, sets up Router, Context, and conditional routing based on authentication.
- `/src/Pages/`: All main pages (Home, Login, Signup, MyMusic, Search, UploadSong, Library, etc.)
- `/src/Components/Shared/`: Reusable UI components (SongCard, NavbarButton, IconText).
- `/src/Containers/`: Layout containers for consistent page structure.
- `/src/utils/`: Utility functions (API helpers, config).
- `/src/App.css`, `/tailwind.config.js`: Styling and theme.

**Routing:**  
- **Authenticated:** Home, UploadSong, MyMusic, Search, Library, Playlists, LikedSongs, UserPage, Friends, Notifications, PartyMode, DJMode.
- **Unauthenticated:** Login, Signup, Home, DauthCallback.

**State Management:**  
- **Global:** Context API for current song, playback status, like status, etc.
- **Local:** React hooks for form inputs, API responses, etc.

**Audio:**  
- **Howler.js** for controlling song playback, pause/play, and sound effects.

**Styling:**  
- Tailwind for responsive, utility-first design.
- Poppins font for modern look.
- Custom loaders and animations.

**Upload:**  
- Song uploads via Cloudinary widget (integrated in `/src/Pages/UploadSong.jsx`).

---

## 2. Backend (DTunes-Backend)

**Tech Stack:**  
- Node.js
- Express.js
- RESTful API
- JWT/cookie-based authentication
- Database (MongoDB or PostgreSQL, inferred)
- Cloudinary for media storage

**Structure:**  
- `/routes/`: Auth, songs, playlists, users, etc.
- `/controllers/`: Business logic for each route.
- `/models/`: Database schemas (User, Song, Playlist).
- `/middleware/`: Auth validation, error handling.
- `/config/`: External service keys, DB connection.

**Endpoints:**  
- `/auth/login`, `/auth/register`, `/auth/logout`: Authentication, session.
- `/song/get/mySongs`, `/song/upload`, `/song/like`: Song library management.
- `/playlist/create`, `/playlist/view`, `/playlist/update`: Playlist operations.
- `/user/view`, `/user/update`: Profile management.

---

## 3. Data Flow

**Authentication:**  
1. User registers/logs in via frontend form.
2. Frontend sends POST request to backend.
3. Backend validates credentials, returns JWT/session token.
4. Token stored in cookie (`useCookies` hook in frontend).
5. Frontend checks token for access to authenticated routes.

**Music Library:**  
1. Frontend requests user’s songs (`/song/get/mySongs`).
2. Backend queries DB, returns song metadata (title, artist, thumbnail, audio URL).
3. Frontend renders songs as cards; Howler.js handles playback.

**Upload:**  
1. User selects/upload song via Cloudinary widget.
2. Widget uploads file to Cloudinary.
3. Frontend sends metadata + Cloudinary URL to backend.
4. Backend saves song info in DB.

**Playback:**  
1. Song metadata passed to player components via Context.
2. Howler.js plays audio from Cloudinary URL.
3. Like/play/pause handled by Context and dispatched to backend as needed.

---

## 4. Authentication Flow

- **Local:** Email/password via POST to `/auth/login` or `/auth/register`.
- **OAuth:** Dauth provider with redirect/callback URLs.
- **Session:** JWT/cookie stored, checked on each page load.
- **Protected Routes:** Conditional rendering (in `/src/App.jsx`) based on token presence.

---

## 5. Audio Playback

- **Library:** Howler.js for audio handling.
- **Context:** Global state for `currentSong`, `isPaused`, `isLiked`.
- **UI:** Play/pause/like buttons update Context and backend.

---

## 6. Media Upload

- **Frontend:** Cloudinary widget script loaded in HTML.
- **User Flow:** User selects file → Cloudinary handles upload → frontend receives URL → sends to backend.
- **Backend:** Stores metadata and Cloudinary URL in DB.

---

## 7. Routing & UI

- **React Router:** All URLs mapped to page components.
- **Conditional Rendering:** Authenticated vs. unauthenticated routes.
- **Reusable Components:** Cards, buttons, icons for UI consistency.

---

## 8. Deployment

- **Frontend:** Vite build → deploy to Vercel/Netlify.
- **Backend:** Node.js/Express → deploy to Heroku/AWS/DigitalOcean.
- **Media:** Cloudinary handles file hosting.
- **Database:** MongoDB Atlas/AWS RDS (inferred).

---

## 9. Extensibility & Scalability

- **Modular design:** Easy to add new pages, features, APIs.
- **Context & hooks:** Simplifies state sharing and updates.
- **REST API:** Decouples frontend and backend for scale.
- **Cloudinary:** Offloads media storage and bandwidth.
- **Reusable UI:** Shared components for maintainability.

---

## 10. Security

- **JWT/cookie authentication:** Protects user sessions.
- **OAuth integration:** Secure federated login.
- **Backend validation:** Input checks, error handling middleware.
- **Cloudinary:** Secure media uploads, access restrictions.

---

## 11. Summary Diagram (Text Representation)

```
[ User Browser ]
      |
      v
[ React Frontend (Vite, Tailwind, Howler, Router, Context) ]
      |
      v
[ REST API Requests ]
      |
      v
[ Node.js Backend (Express, JWT/Auth, DB, Cloudinary) ]
      |
      v
[ Database (User, Song, Playlist) + Cloudinary (Media) ]
```

---

## 12. How to Extend

- Add new pages/components in `/src/Pages/` and `/src/Components/Shared/`.
- Add new backend endpoints in `/routes/` and logic in `/controllers/`.
- Add new DB schemas in `/models/`.
- Integrate more third-party services via `/config/`.

---

**This covers the full, detailed architecture for interviews, documentation, onboarding, or planning future enhancements.**

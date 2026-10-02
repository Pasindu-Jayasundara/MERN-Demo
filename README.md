# Daylight Chat

Daylight is a small full-stack chat demo. The frontend is a React single-page app served by Vite, and the backend is an Express API that stores messages in MongoDB with Mongoose.

## Features

- Choose to use the chat as Maya or Jordan from the welcome page.
- Send messages and view the shared conversation.
- Refresh the conversation automatically every five seconds.
- Delete messages sent by the currently selected user.
- Display loading, empty conversation, and request error states.

## Project layout

```text
MERN-Demo/
|-- Backend/
|   |-- src/
|   |   |-- config/database.js          # MongoDB connection
|   |   |-- controllers/messageController.js
|   |   |-- middleware/errorHandler.js
|   |   |-- models/Message.js           # Mongoose message schema
|   |   |-- routes/messageRoutes.js
|   |   |-- app.js                      # Express middleware and routes
|   |   `-- server.js                   # Connects MongoDB and starts API
|   `-- package.json
`-- Frontend/
    |-- src/
    |   |-- components/                 # Chat header and conversation UI
    |   |-- App.jsx                     # Chat state and API requests
    |   |-- WelcomePage.jsx             # Maya/Jordan selection
    |   |-- main.jsx                    # Router and app entry point
    |   `-- index.css
    |-- index.html
    |-- vite.config.js                  # Proxies /api to the backend
    `-- package.json
```

## Requirements

- Node.js and npm
- A MongoDB instance (local or hosted) and its connection URI

## Run locally

1. Create `Backend/.env` with your MongoDB connection string:

   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/daylight
   PORT=5000
   CLIENT_ORIGIN=http://localhost:5173
   ```

   Replace `MONGODB_URI` with the URI for your MongoDB instance. `PORT` and `CLIENT_ORIGIN` are optional; the defaults are `5000` and `http://localhost:5173`.

2. In one terminal, install backend dependencies and start the API:

   ```bash
   cd Backend
   npm install
   npm run dev
   ```

   Use `npm start` to run without Node's watch mode.

3. In a second terminal, install frontend dependencies and start Vite:

   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite (by default `http://localhost:5173`). Select Maya or Jordan to enter the chat.

The Vite development server forwards requests under `/api` to `http://localhost:5000`. If you change the backend port, update the proxy in `Frontend/vite.config.js` as well as `PORT` in `Backend/.env`.

## API

All endpoints use JSON except for the successful delete response, which has no body.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Returns `{ "status": "ok" }` when the API process is responding. |
| `GET` | `/api/messages` | Returns messages ordered by creation time, oldest first. |
| `POST` | `/api/messages` | Creates a message. Body: `{ "sender": "maya" | "jordan", "text": "..." }`. |
| `DELETE` | `/api/messages/:id?sender=maya` | Deletes the message only when its stored sender matches the supplied `maya` or `jordan`. |

Messages require non-empty text of at most 2,000 characters. Responses include `id`, `sender`, `text`, a formatted `time`, and `createdAt`. Invalid input returns a 400 response; an unavailable message for deletion returns 404.

## Frontend commands

Run these from `Frontend/`:

- `npm run dev` - start the Vite development server.
- `npm run build` - create a production build in `Frontend/dist/`.
- `npm run preview` - serve the production build locally.
- `npm run lint` - run Oxlint.

## Notes

- The `/chat` page reads `?user=maya` or `?user=jordan`; an absent or unrecognized value defaults to Jordan.
- This demo has no account system or authentication. The selected sender is supplied by the browser, so sender checks are not an identity or authorization boundary for a public deployment.
- The API server requires a reachable MongoDB database to start.

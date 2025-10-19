// server.js
import { createServer } from "http";

import { Server } from "socket.io";

import app from "./src/app.js";
import { corsOptions, allowedOrigins } from "./src/config/corsOptions.js";
import { PORT } from "./src/config/env.js";
import pokerSocket from "./src/sockets/pokerSocket.js";

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: corsOptions });

// attach socket handlers (keeps same runtime behavior)
pokerSocket(io);

httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
    console.log("Allowed Origins:", allowedOrigins);
});
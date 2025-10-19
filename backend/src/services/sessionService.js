// src/services/sessionService.js
import { randomUUID } from "crypto";

const sessions = new Map();

export function createSession() {
    const id = randomUUID().slice(0, 8);
    return { id };
}

export function getSession(id) {
    return sessions.get(id);
}

export function ensureSession(id, owner) {
    let session = sessions.get(id);
    if (!session) {
        session = { users: [], votes: {}, revealed: false, owner };
        sessions.set(id, session);
    }
    return session;
}

export function updateSession(id, updates) {
    const session = sessions.get(id);
    if (!session) return null;
    Object.assign(session, updates);
    return session;
}

export function deleteSession(id) {
    sessions.delete(id);
}

export function listSessions() {
    return sessions;
}

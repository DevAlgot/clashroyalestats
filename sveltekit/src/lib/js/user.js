import { writable } from "svelte/store";

let user = writable(null);

export function setUser(userData) {
    user.set(userData);
}

export function clearUser() {
    user.set(null);
}

export function getUser() {
    let currentUser;
    user.subscribe((value) => {
        currentUser = value;
    })();
    return currentUser;
}

export function isUser() {
    return getUser() != null;
}

export { user };
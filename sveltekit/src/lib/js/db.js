// @ts-nocheck
import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';   // or use import.meta.env in some setups

let pool;

export function getPool() {
    if (!pool) {
        pool = mysql.createPool({
            host: env.DB_HOST || 'mariadb',      // docker service name
            user: env.DB_USER || 'world',
            password: env.DB_PASSWORD || '12345',
            database: env.DB_NAME || 'clash_db',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            // Important in Docker + serverless-like envs:
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });
    }
    return pool;
}

// Helper (optional)
export async function query(sql, params) {
    const p = getPool();
    const [rows] = await p.execute(sql, params);
    return rows;
}

export async function getUser(sessionId) {

    const res = await fetch('http://nginx/api/session.php', { headers: { cookie: `PHPSESSID=${sessionId}` } })

    if (res.ok) {
        const data = await res.json();
        return { user: data };
    } else {
        console.error("Failed to fetch user data, status: ", res.status);
        return null;
    }
}
import * as db from '$lib/js/db.js';
import { setUser } from '$lib/js/user.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, locals }) {
    const sessionid = cookies.get('PHPSESSID');
    const user = await db.getUser(sessionid);
    setUser(user);

    locals.user = user; // Store user in locals for access in endpoints


    // @ts-ignore
    return user;
}
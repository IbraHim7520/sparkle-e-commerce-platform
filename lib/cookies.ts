import { cookies } from "next/headers";
export let cookieString = "";
export async function getAllCookies (){
    const cookieStore = await cookies();
    cookieString = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
    return cookieString
}

getAllCookies()
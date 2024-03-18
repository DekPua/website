'use client'

import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();
    const access_token = getCookie('access_token');

    router.push(`https://dekpua-api.hewkawar.xyz/auth/logout?access_token=${access_token}`);
}
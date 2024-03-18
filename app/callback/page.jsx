'use client'

import { deleteCookie, setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation"

export default function Callback() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const hasAcToken = searchParams.has('access_token');
    const hasError = searchParams.has('error');
    const hasLogout = searchParams.has('logout')

    if (!hasError && hasAcToken) {
        setCookie('access_token', searchParams.get('access_token'), { maxAge: 60 * 60 * 24 * 5 });
    } else if (!hasError && hasLogout) {
        const logoutValue = searchParams.get('logout');

        if (logoutValue.toString() == 'true') {
            deleteCookie('access_token');
        }
    }

    router.prefetch('/');
    router.push('/');
    router.refresh();
}
'use client'

import { setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation"

export const metadata = {
    robots: {
        index: false,
        follow: true,
        nocache: true,
    },
}

export default function Callback() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const hasAcToken = searchParams.has('access_token');

    if (hasAcToken) {
        setCookie('access_token', searchParams.get('access_token'), { maxAge: 60 * 60 * 24 * 5 });
    }

    router.prefetch('/');
    router.push('/');
    router.refresh();
}
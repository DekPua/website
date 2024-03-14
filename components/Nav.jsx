'use client';
import Image from "next/image";
import Style from "./components.module.css"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav({ loginDetail }) {
    const loginUrl = "https://discord.com/oauth2/authorize?client_id=1213460455503302716&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4030%2Fauth%2Fdiscord%2Fcallback&scope=identify+email+guilds";
    const router = useRouter();

    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        document.body.addEventListener('click', (event) => {
            const profileBox = document.getElementById('profile_box');

            if (isProfileOpen && !profileBox.contains(event.target)) {
                toggleActionControl();
            }
        })
    }, []);

    function toggleActionControl() {
        setIsProfileOpen(!isProfileOpen)
    }

    return (
        <div className={Style.nav}>
            <div className={Style.navlist}>
                <Link href="/"><Image alt="DekPua Favicon" priority={true} src="/favicon.png" width={50} height={50} /></Link>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/rules">Rules</Link>
            </div>
            {loginDetail ? (
                <>
                    <div className={Style.profile} onClick={() => toggleActionControl()} id="profile_box">
                        <Image className={Style.profile_image} alt={`${loginDetail.user.username}_profile`} priority={true} src={`https://cdn.discordapp.com/avatars/${loginDetail.user.id}/${loginDetail.user.avatar}.png?size=64`} width={50} height={50} />
                        <p>{loginDetail.user.global_name}</p>
                    </div>

                    <div id="action_control" className={isProfileOpen ? Style.action_control : Style.none}>
                        <ul>
                            <li><Link href="/profile">Profile</Link></li>
                            <li><Link href="/servers">Server List</Link></li>
                            <li><Link href="https://discord.gg/66BtV8WwsA" target="_blank">DekPua Official</Link></li>
                            <li><Link href="/logout">Logout</Link></li>
                        </ul>
                    </div>
                </>
            ) : (
                <div className={Style.navlogin}>
                    <Link href={loginUrl}>Log In with Discord</Link>
                </div>
            )}
        </div>
    );

}
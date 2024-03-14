import { cookies } from "next/headers";
import Image from "next/image";
import style from './server.module.css';
import Link from "next/link";

async function getLoginData(access_token) {
    const res = await fetch(`http://localhost:4030/auth/info?access_token=${access_token}`, { cache: "force-cache" });

    return res.json()
}

export default async function Servers() {
    const cookieStore = cookies();

    const hasAccessToken = cookieStore.has('access_token');

    if (hasAccessToken) {
        const access_token = cookieStore.get('access_token');

        const loginDetail = await getLoginData(access_token.value);

        const servers = loginDetail.guilds;

        return (
            <div className={style.server_list}>
                {servers.map(guild => (
                    <Link target="_blank" className={style.hide_underline} key={guild.id} href={`https://discord.com/channels/${guild.id}`}>
                        <div className={style.server_data} title={guild.name}>
                            {guild.icon ? <Image className={style.guild_image} src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} width={100} height={100} /> : <Image className={style.guild_image} src={`/discord.png`} width={100} height={100} />}
                            <h2 className={style.guild_name}>{guild.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        );
    } else {
        window.location.href = '/';
        return null; // or you can return a loading indicator or a message
    }
}

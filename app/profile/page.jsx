import { cookies } from "next/headers";
import Image from "next/image";
import style from "./profile.module.css";

const flags = {
    STAFF: "STAFF",
    PARTNER: "PARTNER",
    HYPESQUAD: "HYPESQUAD",
    BUG_HUNTER_LEVEL_1: "BUG_HUNTER_LEVEL_1",
    HYPESQUAD_ONLINE_HOUSE_1: "HYPESQUAD_ONLINE_HOUSE_1",
    HYPESQUAD_ONLINE_HOUSE_2: "HYPESQUAD_ONLINE_HOUSE_2",
    HYPESQUAD_ONLINE_HOUSE_3: "HYPESQUAD_ONLINE_HOUSE_3",
    PREMIUM_EARLY_SUPPORTER: "PREMIUM_EARLY_SUPPORTER",
    TEAM_PSEUDO_USER: "TEAM_PSEUDO_USER",
    BUG_HUNTER_LEVEL_2: "BUG_HUNTER_LEVEL_2",
    VERIFIED_BOT: "VERIFIED_BOT",
    VERIFIED_DEVELOPER: "VERIFIED_DEVELOPER",
    CERTIFIED_MODERATOR: "CERTIFIED_MODERATOR",
    BOT_HTTP_INTERACTIONS: "BOT_HTTP_INTERACTIONS",
    ACTIVE_DEVELOPER: "ACTIVE_DEVELOPER",
};

async function getLoginData(access_token) {
    const res = await fetch(`https://dekpua-api.hewkawar.xyz/auth/info?access_token=${access_token}`, { cache: 'force-cache' });

    return res.json()
}

function checkUserFlags(flags) {
    const flagList = {
        STAFF: 1 << 0,
        PARTNER: 1 << 1,
        HYPESQUAD: 1 << 2,
        BUG_HUNTER_LEVEL_1: 1 << 3,
        HYPESQUAD_ONLINE_HOUSE_1: 1 << 6,
        HYPESQUAD_ONLINE_HOUSE_2: 1 << 7,
        HYPESQUAD_ONLINE_HOUSE_3: 1 << 8,
        PREMIUM_EARLY_SUPPORTER: 1 << 9,
        TEAM_PSEUDO_USER: 1 << 10,
        BUG_HUNTER_LEVEL_2: 1 << 14,
        VERIFIED_BOT: 1 << 16,
        VERIFIED_DEVELOPER: 1 << 17,
        CERTIFIED_MODERATOR: 1 << 18,
        BOT_HTTP_INTERACTIONS: 1 << 19,
        ACTIVE_DEVELOPER: 1 << 22,
    };

    const result = {};
    for (const [flagName, flagValue] of Object.entries(flagList)) {
        result[flagName] = (flags & flagValue) === flagValue;
    }
    return result;
}

function renderFlag(flagData) {
    const w = 20;
    const h = 20;
    const haveFlagsList = [];

    if (flagData.ACTIVE_DEVELOPER) {
        haveFlagsList.push(<Image src='/badges/ActiveDeveloper.png' title="Active Developer" width={w} height={h} />)
    }

    if (flagData.HYPESQUAD_ONLINE_HOUSE_3) {
        haveFlagsList.push(<Image src='/badges/Balance.png' title="HypeSquad Balance" width={w} height={h} />)
    }

    if (flagData.HYPESQUAD_ONLINE_HOUSE_1) {
        haveFlagsList.push(<Image src='/badges/Bravery.png' title="HypeSquad Bravery" width={w} height={h} />)
    }

    if (flagData.HYPESQUAD_ONLINE_HOUSE_2) {
        haveFlagsList.push(<Image src='/badges/Brilliance.png' title="HypeSquad Brilliance" width={w} height={h} />)
    }

    if (flagData.BUG_HUNTER_LEVEL_1) {
        haveFlagsList.push(<Image src='/badges/BugHunter.png' title="Bug Hunter" width={w} height={h} />)
    }

    if (flagData.BUG_HUNTER_LEVEL_2) {
        haveFlagsList.push(<Image src='/badges/GoldenBugHunter.png' title="Golden Bug Hunter" width={w} height={h} />)
    }

    if (flagData.CERTIFIED_MODERATOR) {
        haveFlagsList.push(<Image src='/badges/CertifiedModerator.png' title="Certified Discord Moderator" width={w} height={h} />)
    }

    if (flagData.STAFF) {
        haveFlagsList.push(<Image src='/badges/DiscordStaff.png' title="Discord Staff" width={w} height={h} />)
    }

    if (flagData.PREMIUM_EARLY_SUPPORTER) {
        haveFlagsList.push(<Image src='/badges/EarlySupporter.png' title="Early Supporter" width={w} height={h} />)
    }

    if (flagData.HYPESQUAD) {
        haveFlagsList.push(<Image src='/badges/Hypesquad.png' title="Hypesquad" width={w} height={h} />)
    }

    if (flagData.PARTNER) {
        haveFlagsList.push(<Image src='/badges/Partner.png' title="Partner" width={w} height={h} />)
    }

    if (flagData.VERIFIED_BOT) {
        haveFlagsList.push(<Image src='/badges/VerifiedBot.png' title="Verified Bot" width={w} height={h} />)
    }

    if (flagData.VERIFIED_DEVELOPER) {
        haveFlagsList.push(<Image src='/badges/VerifiedBotDeveloper.png' title="Verified Bot Developer" width={w} height={h} />)
    }

    return haveFlagsList;
}

export const metadata = {
    robots: {
        index: false,
        follow: true,
        nocache: true,
    },
}

export default async function Profile() {
    const cookieStrore = cookies();

    const hasAccessToken = cookieStrore.has('access_token');

    if (hasAccessToken) {
        const access_token = cookieStrore.get('access_token');

        const loginDetail = await getLoginData(access_token.value);

        console.log(loginDetail.user);
        let nitro = "None";

        if (loginDetail.user.premium_type == 1) {
            nitro = 'Nitro Classic'
        } else if (loginDetail.user.premium_type == 2) {
            nitro = 'Nitro'
        } else if (loginDetail.user.premium_type == 3) {
            nitro = 'Nitro Basic'
        }

        const flagData = checkUserFlags(loginDetail.user.flags);

        const flagHtml = renderFlag(flagData);

        return (
            <div className={style.profile}>
                <Image src={`https://cdn.discordapp.com/avatars/${loginDetail.user.id}/${loginDetail.user.avatar}.png?size=512`} width={300} height={300} className="profile_image" />
                <h2>{loginDetail.user.global_name}</h2>
                <p>Username : {loginDetail.user.username}</p>
                <p>ID : {loginDetail.user.id}</p>
                <p>Email : {loginDetail.user.email} {loginDetail.user.verified ? (<span title="Verified Email">✅</span>) : (<span title="Unverify Email">❌</span>)}</p>
                <p>Nitro : {nitro}</p>
                <p>Locale : {loginDetail.user.locale}</p>
                <div className={style.flex_row}>Flags : <div className={style.flags}>{flagHtml}</div></div>
            </div>
        )
    } else {
        window.location.href = '/'
    }
}
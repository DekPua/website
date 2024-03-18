import "./globals.css";
import { cookies } from 'next/headers'
import Content from "@/components/Content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "DekPua",
  description: "DekPua พื้นที่สำหรับนักเรียนโรงเรียนปัว",
  keywords: ["dekpua", "DekPua", "เด็กปัว", "โรงเรียนปัว", "Pua School", "Dek Pua", "dek pua"],
  publisher: "DekPua Team",
  openGraph: {
    title: "DekPua",
    url: "https://dekpua.hewkawar.xyz/",
    images: "https://dekpua.hewkawar.xyz/favicon.png",
    locale: "th",
    type: 'website',
  }
};

async function getLoginData(access_token) {
  // Check if cached data is available
  const cachedData = sessionStorage.getItem('loginData');
  if (cachedData) {
    const { timestamp, data } = JSON.parse(cachedData);
    // Check if the data is not expired (30 minutes)
    if (Date.now() - timestamp < 30 * 60 * 1000) {
      return data;
    }
  }

  const res = await fetch(`https://dekpua-api.hewkawar.xyz/auth/info?access_token=${access_token}`, { cache: "force-cache" });
  const loginDetail = await res.json();

  // Cache the data in sessionStorage
  sessionStorage.setItem('loginData', JSON.stringify({ timestamp: Date.now(), data: loginDetail }));

  return loginDetail;
}

export default async function RootLayout({ children }) {
  const cookieStrore = cookies();

  const hasAccessToken = cookieStrore.has('access_token');

  if (hasAccessToken) {
    const access_token = cookieStrore.get('access_token');

    const loginDetail = await getLoginData(access_token.value);

    return (
      <html lang="en">
        <body>
          <Nav loginDetail={loginDetail} />
          <Content content={children} loginDetail={loginDetail}/>
          <Footer />
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body>
          <Nav />
          <Content content={children} />
          <Footer />
        </body>
      </html>
    );
  }
}

import "./globals.css";
import { cookies } from 'next/headers'
import Content from "@/components/Content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "DekPua",
  description: "DekPua",
};

async function getLoginData(access_token) {
  const res = await fetch(`https://dekpua-api.hewkawar.xyz/auth/info?access_token=${access_token}`, { cache: "force-cache" });

  return res.json()
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

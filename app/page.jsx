import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import style from './home.module.css';

async function getHomeLayer() {
  const data = await fetch('https://raw.githubusercontent.com/DekPua/rules/main/layouts/home.json', { cache: 'force-cache' });

  const text = await data.text();

  const json = JSON.parse(text);

  return json;
}

async function getRawText(url) {
  const data = await fetch(url);
  const text = await data.text();

  return text;
}

export const metadata = {
  title: "หน้าแรก | DekPua",
  description: "DekPua พื้นที่สำหรับนักเรียนโรงเรียนปัว",
  keywords: ["dekpua", "DekPua", "เด็กปัว", "โรงเรียนปัว", "Pua School", "Dek Pua", "dek pua"],
  publisher: "DekPua Team",
  openGraph: {
    title: "หน้าแรก | DekPua",
    url: "https://dekpua.hewkawar.xyz/",
    images: "https://dekpua.hewkawar.xyz/favicon.png",
    locale: "th",
    type: 'website',
  }
};

export default async function Home() {
  const homeLayer = await getHomeLayer();

  return (
    <>
      {homeLayer.map(async (layer, index) => {
        if (layer.type === 'image') {
          if (layer.image.width == layer.image.height) return (
            <div key={index} className={style.imageContainer}>
              <img src={layer.file} className={style.squareImage} alt={`Image ${index}`} />
            </div>
          )
          else return (
            <div key={index} className={style.imageContainer}>
              <img src={layer.file} className={style.image} alt={`Image ${index}`} />
            </div>
          );

        } else if (layer.type === 'text') {
          return (
            <div key={index} className={style.text} >
              <Markdown remarkPlugins={[remarkGfm]}>{await getRawText(`https://raw.githubusercontent.com/DekPua/rules/main/${layer.file}`)}</Markdown>
            </div>
          );
        } else {
          // Handle other types if needed
          return null;
        }
      })}
    </>
  );

}
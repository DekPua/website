import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import style from './about.module.css';

async function getAboutLayer() {
    const data = await fetch('https://raw.githubusercontent.com/DekPua/rules/main/layouts/about.json', { cache: 'force-cache' });

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
  title: "เกี่ยวกับ | DekPua",
  description: "DekPua พื้นที่สำหรับนักเรียนโรงเรียนปัว",
  keywords: ["dekpua", "DekPua", "เด็กปัว", "โรงเรียนปัว", "Pua School", "Dek Pua", "dek pua"],
  publisher: "DekPua Team",
  openGraph: {
    title: "เกี่ยวกับ | DekPua",
    url: "https://dekpua.hewkawar.xyz/about",
    images: "https://dekpua.hewkawar.xyz/favicon.png",
    locale: "th",
    type: 'website',
  }
};

export default async function About() {
    const aboutLayer = await getAboutLayer();
    
    return (
        <>
          {aboutLayer.map(async (layer, index) => {
            if (layer.type === 'image') {
              return (
                <div key={index} >
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
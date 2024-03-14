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
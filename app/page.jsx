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
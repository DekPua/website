import Style from "./components.module.css"

export default function Content({ content, loginDetail }) {
    return (
        <div className={Style.content}>
            { content }
        </div>
    );
}
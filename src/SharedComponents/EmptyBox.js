import SectionHeader from "../SharedComponents/SectionHeader";
import empty from "./empty.png";
import "./EmptyBox.css";

export default function EmptyBox(params) {
  const { className, title } = params;
  return (
    <div className={`empty-box ${className}`}>
      <img
        src={empty}
        alt="an empty box. no tasks here"
        className="empty-box__box"
      />
      <SectionHeader title={title} />
    </div>
  );
}

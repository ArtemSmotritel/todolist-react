import React from "react";
import "./SectionHeader.css";

export default function SectionHeader(params) {
  const { title } = params;
  return <h2 className="title">{title}</h2>;
}

import React from "react";
import css from "./Heading.module..css";

const { header } = css;

export default function Heading() {
  return <h1 className={header}>The place to be for checking game prices</h1>;
}

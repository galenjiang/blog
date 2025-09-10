"use client";

import React, { useEffect } from "react";
import hljs from "highlight.js/lib/core";
import "./style.scss";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import shell from "highlight.js/lib/languages/shell";
import yaml from "highlight.js/lib/languages/yaml";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import haskell from "highlight.js/lib/languages/haskell";
// Then register the languages you need
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("json", json);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("haskell", haskell);
// hljs.configure({
//     classPrefix: ''
// })

export default function HightlightWrapper(props: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  return props.children;
}

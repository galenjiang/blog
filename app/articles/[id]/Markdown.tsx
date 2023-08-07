'use client'

import React, { useEffect } from "react";
import hljs from 'highlight.js/lib/core';
import "./style.scss";
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import shell from 'highlight.js/lib/languages/shell';
import yaml from 'highlight.js/lib/languages/yaml';
import json from 'highlight.js/lib/languages/json';
// Then register the languages you need
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('json', json);

export default function Markdown(props:  { children: React.ReactNode }) {
    console.log('render markdown')
    useEffect(() => {
        hljs.highlightAll()
    }, [])
    return props.children
}
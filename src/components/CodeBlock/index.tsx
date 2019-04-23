import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'

export const CodeBlock = ({ children }: any) => (
  <Highlight {...defaultProps} code={children} language="javascript">
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <code
        className={className}
        style={{
          ...style,
        }}
      >
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </code>
    )}
  </Highlight>
)

import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'

export const CodeBlock = ({ children }: any) => {
  return (
    <Highlight {...defaultProps} code={children} language="javascript">
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <pre
            className={className}
            style={{
              ...style,
              padding: '20px',
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )
      }}
    </Highlight>
  )
}

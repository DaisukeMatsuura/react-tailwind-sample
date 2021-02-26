import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/cjs/styles/prism"

interface P {
  value: string
}

const CodeBlock: React.FC<P> = ({ value }) => {
  return (
    <SyntaxHighlighter language='javascript' style={base16AteliersulphurpoolLight}>
      {value}
    </SyntaxHighlighter>
  )
}

export default CodeBlock
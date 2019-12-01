import React from 'react'

const SourcesList = (props) => {
  const sources = props.item.sources

  return <div><div className="divider" /><div className="text-container">
    <h3>Sources</h3>
    {
      sources.map((source, i) => <div>
        <p>#{i+1}. <u>{source.source_article_title}</u> from <b>{source.source_title}</b> (<a target="_blank" href={source.source_link}>Link</a>)</p>
        <p>{source.source_description}</p>
      </div>)
    }
  </div><div className="reverse-divider" /></div>

}

export default SourcesList

import React from 'react';
const ArtworkPreview = ({ imageUrl, artist, title, style }) => {
    return (<div>
      <img src={imageUrl} alt={title} style={style}/>
      <h2>{title}</h2>
      <p>By {artist}</p>
    </div>);
};
export default ArtworkPreview;

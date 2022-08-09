import React, { useState } from 'react';
import './UrlContainer.css';
import { deleteUrl } from '../../apiCalls';


const UrlContainer = props => {


  const deleteUrlCard = (id) => {
    deleteUrl(id).then(
      props.deleteFromState(id)
    )
  }

  const urlEls = props.urls.map(url => {
    return (
      <div className="url">
        <h3>{url.title}</h3>
        <a href={url.short_url} target="blank">{url.short_url}</a>
        <p>{url.long_url}</p>
        <button className='delete-button' onClick={() => deleteUrlCard(url.id)}>DELETE</button>
      </div>
    )
  });

  return (
    <section>
      { urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;

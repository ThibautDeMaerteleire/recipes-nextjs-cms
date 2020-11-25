import React, {useState} from 'react';

const SideRecipe = ({data}) => {

  console.log(data)
  return(
    <div onClick={() => window.location.href = `/recipe/${data.uid}`} className="siderecipe" href={`/recipe/`}>
      <h5 className="siderecipe__title">{data.data.title[0].text}</h5>
      <img src={data.data.thumbnail.small.url} />
      <div><span>Open</span></div>
    </div>
  );
};

export default SideRecipe;
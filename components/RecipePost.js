import React from 'react';

const RecipePost = ({data, fadein}) => {
  console.log(data);
  return(
    <a href={`/recipe/${data.uid}`} className="col-md-4 col-12">
      <div className="recipepost">
        <h2>{data.data.title[0].text}</h2>
        <picture>
          <source srcSet={data.data.thumbnail.small.url} media="(max-width: 576px)" />
          <source srcSet={data.data.thumbnail.medium.url} media="(max-width: 768px)" />
          <img src={data.data.thumbnail.url} alt="Thumbnail" />
        </picture>
      </div>
    </a>
  );
}

export default RecipePost;
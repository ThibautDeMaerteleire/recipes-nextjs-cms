import React, { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { RichText } from 'prismic-reactjs';
import { useRouter } from 'next/router';

import { client } from '../../prismic-configuration';
import NotFound from '../NotFound';
import Loading from '../Loading';
import { Header, Footer, SideRecipe } from '../../components';

const Recipe = () => {
  const [doc, setDocData] = useState(null);
  const [sideRecipes, setSideRecipes] = useState(null);
  const [notFound, toggleNotFound] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const TwoDigits = (n) => {
    if(n < 10) return `0${n}`;
    else return n;
  }

  const displayDate = (time) => {
    const d = new Date(time);
    return `🕙 ${TwoDigits(d.getHours())}:${TwoDigits(d.getMinutes())} 📅 ${TwoDigits(d.getDate())}/${TwoDigits(d.getMonth())}/${d.getFullYear()}`;
  }

  // Get the page document from Prismic
  useEffect(() => {
    const fetchData = async () => {
      // We are using the function to get a document by its UID
      const result = await client.getByUID('recipe', `${id}`);

      const randomRecipes = await client.query('', { pageSize : 5 });

      if (result && randomRecipes) {
        // We use the State hook to save the document
        setSideRecipes(randomRecipes);
        return setDocData(result);
      } else {
        // Otherwise show an error message
        toggleNotFound(true);
      }
    }
    fetchData();
  }, [id]); // Skip the Effect hook if the UID hasn't changed

  if(doc) {
    return (
      <Fragment>
        <Header />
        <Head>
        <title>{doc.data.title[0].text}</title>
        </Head>
        <div className="recipe container-fluid">
          <h1 className="title">{RichText.asText(doc.data.title)}</h1>   
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="tags">
                {doc.tags.map((e, key) => <span key={key}>{e}</span>)}
              </div>
              <p className="description">{RichText.asText(doc.data.description)}</p>
              <h2>Ingredients</h2>
              <ul className="ingredients">
                { doc.data.ingredients.map((ingredient, key) => <li key={key} >{ingredient.text}</li>) }
              </ul>
              <p>{displayDate(doc.last_publication_date)}</p>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <picture>
                <source srcSet={doc.data.thumbnail.small.url} media="(max-width: 576px)" />
                <source srcSet={doc.data.thumbnail.medium.url} media="(max-width: 768px)" />
                <img src={doc.data.thumbnail.url} alt="Thumbnail" />
              </picture>
              <h2 className="preptitle">Preparation</h2>
              <ol className="preparation">
                { doc.data.preparation.map((step, key) => <li key={key} >{step.text}</li>) }
              </ol>
            </div>
            <div className="col-lg-2 col-md-0 col-12">
              {sideRecipes.results.map((e, key) => <SideRecipe key={key} data={e} />)}
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    )
  } else if (notFound) {
    return <NotFound />
  } else {
    return (
      <Loading />
    );
  }
}

export default Recipe;
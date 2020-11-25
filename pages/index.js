import React, {useState, useEffect} from 'react';
import Head from 'next/head';

import { client } from '../prismic-configuration';
import { Header, Footer, RecipePost } from '../components';
import NotFound from './NotFound';
import Loading from './Loading';

const Home = () => {
  const [allRecipes, setAllRecipes] = useState(null);
  const [notFound, toggleNotFound] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const getAllRecipes = await client.query('');
      console.log(getAllRecipes)
      if(getAllRecipes) {
        // We use the State hook to save the document
        return setAllRecipes(getAllRecipes);
      } else {
        // Otherwise show an error message
        toggleNotFound(true);
      }
    };
    fetchData();
  }, []);

  if(allRecipes) {
    return (
      <div className="home">
        <Head>
          <title>CheckYourRecipe</title>
        </Head>
        <Header />
        <main className="container-fluid">
          <h1 className="title">Welcome cook<br/>👩🏼‍🍳👨🏼‍🍳</h1>
          <div className="row">
            {allRecipes.results.map((e, key) => <RecipePost key={key} fadein={(key%2 == 1) ? 'Left' : 'Right' } data={e} />)}
          </div>
        </main>
        <Footer />
      </div>
    );
  } else if(notFound) {
    return <NotFound />
  } else {
    return <Loading />;
  }
  
};

export default Home;
import {useEffect} from 'react';
import '../styles/globals.css';
import '../sass/main.scss';
import 'popper.js';

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    import("jquery").then($ => {
      // jQuery must be installed to the `window` before bootstrap's js is installed:
      window.$ = window.jQuery = $;
      return import("bootstrap");
    });
  }, []);
  return <Component {...pageProps} />
}

export default MyApp;

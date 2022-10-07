import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'tailwindcss/tailwind.css';
import '../public/styles/global.css';
import MiniDrawer from '../src/components/menu';
import {SnackbarProvider} from '../src/context/snackbar';
import Pages from './pages';

function MyApp({ Component, pageProps }) {
  return (
      <SnackbarProvider>
        <MiniDrawer>
          <Pages pageProps={pageProps} Component={Component} router={pageProps.router} />
        </MiniDrawer>
      </SnackbarProvider>
  );
}

export default MyApp;

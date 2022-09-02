import 'tailwindcss/tailwind.css';
import '../public/styles/global.css';
import {Pages} from './pages';
import MiniDrawer from '../src/components/menu';
import {SnackbarProvider} from '../src/context/snackbar';

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

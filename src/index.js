import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './translateLibrary/i18n';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import { GlobalStyles, Grid } from './components/GlobalCSS';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <GlobalStyles>
                <Grid>
                    <GoogleOAuthProvider clientId="542258222683-k64hdtdjnuefslalovlkq4tvj6e4nodp.apps.googleusercontent.com">
                        <App />
                    </GoogleOAuthProvider>
                </Grid>
            </GlobalStyles>
        </I18nextProvider>
    </React.StrictMode>,
);

reportWebVitals();

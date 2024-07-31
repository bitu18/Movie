import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './translateLibrary/i18n';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import { GlobalStyles, Grid } from './components/GlobalCSS';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <GlobalStyles>
                <Grid>
                    <App />
                </Grid>
            </GlobalStyles>
        </I18nextProvider>
    </React.StrictMode>,
);

reportWebVitals();

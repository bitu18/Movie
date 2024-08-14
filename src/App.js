import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { publicRoutes } from '~/routes';
import MainLayout from '~/layouts';
import FormProvider from './store';
import FormType from './store/formType';
import Options from './store/optionMobile';
import ScrollTop from '~/components/scrollToTop';

function App() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY >= 400);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
    return (
        <FormProvider>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            const Layout = route.layout === null ? Fragment : route.layout || MainLayout;

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                    <FormType />
                    <Options />

                    {showScrollTop && <ScrollTop />}
                </div>
            </BrowserRouter>
        </FormProvider>
    );
}

export default App;

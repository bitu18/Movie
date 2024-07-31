import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { publicRoutes } from '~/routes';
import MainLayout from '~/layouts';
import FormProvider from './store';
import { useForm, useOptions } from './store';
import Register from './layouts/components/PopperForm/FormType/Register';
import { SignIn } from './layouts/components/PopperForm/FormType';
import NavOptions from './components/NavOptions';

function FormWrapper() {
    const { showForm, formType } = useForm();
    if (!showForm) return null;
    return formType === 'register' ? <Register /> : <SignIn />;
}
function Options() {
    const { showMobileOptions } = useOptions();
    return showMobileOptions && <NavOptions />;
}
function App() {
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
                    <FormWrapper />
                    <Options />
                </div>
            </BrowserRouter>
        </FormProvider>
    );
}

export default App;

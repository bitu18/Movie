import React from 'react';
import { useTranslation } from 'react-i18next';

export const TranslationContext = React.createContext();

export const TranslationProvider = ({ children }) => {
    const { t } = useTranslation();

    return <TranslationContext.Provider value={{ t }}>{children}</TranslationContext.Provider>;
};

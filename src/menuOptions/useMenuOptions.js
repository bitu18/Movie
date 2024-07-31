// src/menuOptions/useMenuOptions.js

import { HelpIcon, LanguageIcon, LogoutIcon, ProfileIcon, SettingsIcon } from '~/components/Icon/Icon';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { useForm } from '~/store';
import { useState } from 'react';

export function useMenuOptions() {
    const { t, i18n } = useTranslation();
    const { currentUser } = useForm();
    const [selectLanguage, setSelectLanguage] = useState(i18n.language);

    // Menu for PC and Tablet
    const MENU_OPTIONS = (t) => [
        {
            leftIcon: <LanguageIcon />,
            title: 'Language',
            children: {
                type: 'Language',
                title: t('Language'),
                data: [
                    {
                        title: 'English',
                        rightIcon: i18n.language === 'en' ? <FontAwesomeIcon icon={faCheck} /> : null,
                        code: 'en',
                    },
                    {
                        title: 'Vietnamese',
                        rightIcon: i18n.language === 'vi' ? <FontAwesomeIcon icon={faCheck} /> : null,
                        code: 'vi',
                    },
                ],
            },
        },
        { leftIcon: <SettingsIcon />, title: 'Setting', to: '/setting' },
        { leftIcon: <HelpIcon />, title: 'Help center', to: '/feedback' },
    ];

    const USER_MENU_OPTIONS = (t) => [
        { leftIcon: <ProfileIcon />, title: 'View profile', to: `/account/@${currentUser?.firstName}` },
        ...MENU_OPTIONS(t),
        { leftIcon: <LogoutIcon />, title: 'Log out', separate: true },
    ];

    // Menu for Mobile
    const MOBILE_MENU_OPTIONS = (t) => [
        { title: 'Setting', to: '/setting' },
        { title: 'Help center', to: '/feedback' },
    ];
    const MOBILE_USER_MENU_OPTIONS = (t) => [
        { title: 'View profile', to: `/account/@${currentUser?.firstName}` },
        // ...MOBILE_MENU_OPTIONS(t),
        { title: 'Log out' },
    ];

    return { MENU_OPTIONS, USER_MENU_OPTIONS, MOBILE_MENU_OPTIONS, MOBILE_USER_MENU_OPTIONS };
}

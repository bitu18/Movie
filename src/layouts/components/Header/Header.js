import { faBars, faCheck, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next'; // Import useTranslation hook

import img from '~/assets/imgs';
import Button from '~/components/Button';
import Image from '~/components/Image';
import MenuOption from '~/components/Popper/MenuOption/MenuOption';
import styles from './Header.module.scss';
import Search from '../Search';
import routes from '~/config/routes';
import { useForm, useOptions } from '~/store';
import { useMenuOptions } from '~/menuOptions/useMenuOptions';

const cx = classNames.bind(styles);

function Header() {
    const { t, i18n } = useTranslation();
    const [selectLanguage, setSelectLanguage] = useState(i18n.language);

    const { handleShowForm, isAuthenticated, currentUser } = useForm();
    const { showMobileOptions, handleShowSideBar, handleHideSideBar } = useOptions();

    const { MENU_OPTIONS, USER_MENU_OPTIONS } = useMenuOptions();

    useEffect(() => {
        setSelectLanguage(i18n.language);
    }, [i18n.language, selectLanguage]);

    // Hangle change
    const hangleMenuChange = (menuOption) => {
        if (menuOption.code === 'en' || menuOption.code === 'vi') {
            i18n.changeLanguage(menuOption.code).then(() => {
                window.location.reload();
            });
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('grid wide')}>
                <div className={cx('inner')}>
                    <div className={cx('logo')}>
                        <Link to={routes.home}>
                            <Image src={img.logo} alt="logo-movie" />
                        </Link>
                    </div>

                    <Search />

                    <button className={cx('side-bar-option-mobile')} onClick={handleShowSideBar}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>

                    <div className={cx('actions')}>
                        {isAuthenticated ? (
                            <>
                                <h4 className={cx('name-user')}>
                                    <Trans>Hi</Trans>, {currentUser.firstName}
                                </h4>
                                <Image
                                    className={cx('avatar-user')}
                                    src="https://v4.ghienphim.me/uploads/KNUzLTcebE6v1Dir7AuGmCRQXMw9OnjH.jpg?v=1624896053"
                                    alt={currentUser.firstName}
                                />
                            </>
                        ) : (
                            <>
                                <Button outline medium onClick={() => handleShowForm('logIn')}>
                                    Login
                                </Button>
                                <Button primary medium onClick={() => handleShowForm('register')}>
                                    Register
                                </Button>
                            </>
                        )}

                        <MenuOption
                            key={isAuthenticated ? 'user' : 'guest'}
                            options={isAuthenticated ? USER_MENU_OPTIONS(t) : MENU_OPTIONS(t)}
                            onChange={hangleMenuChange}
                        >
                            <button className={cx('more-option')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        </MenuOption>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

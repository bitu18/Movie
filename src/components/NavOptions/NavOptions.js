import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import routes from '~/config/routes';
import { NavLink } from 'react-router-dom';
import { Trans } from 'react-i18next';

import styles from './NavOptions.module.scss';
import Popper from '../Popper';
import { useOptions, useForm } from '~/store';
import NavOptionItem from './NavOptionItem';
import Button from '../Button';
import { useMenuOptions } from '~/menuOptions/useMenuOptions';
import { useTranslation } from 'react-i18next';
import Header from './Header';

const cx = classNames.bind(styles);

function NavOptions({ onHandleMenuChange }) {
    const { t, i18n } = useTranslation();
    const { handleShowForm, isAuthenticated, currentUser, logOut } = useForm();
    const { showMobileOptions, handleShowSideBar, handleHideSideBar } = useOptions();

    const { MOBILE_MENU_OPTIONS, MOBILE_USER_MENU_OPTIONS } = useMenuOptions();

    // Hangle change
    const hangleChangeLanguage = (language) => {
        i18n.changeLanguage(language).then(() => {
            window.location.reload();
        });
    };

    const handleMenuChange = (menuOption) => {
        if (menuOption.title === 'Log out') {
            logOut();
        }
    };

    return (
        <div className={cx('overlay')} onClick={handleHideSideBar}>
            <Popper className={cx('wrapper-options')}>
                <div className={cx('list')}>
                    <div className={cx('form')}>
                        {isAuthenticated ? (
                            <>
                                <h4 className={cx('name-user')}>
                                    <Trans>Hi</Trans>, {currentUser.firstName}
                                </h4>
                            </>
                        ) : (
                            <>
                                <Button
                                    className={cx('btn-login')}
                                    outline
                                    medium
                                    onClick={() => handleShowForm('logIn')}
                                >
                                    Login
                                </Button>
                                <Button
                                    className={cx('btn-login')}
                                    primary
                                    medium
                                    onClick={() => handleShowForm('register')}
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {isAuthenticated && (
                    <div className={cx('list')}>
                        <div className={cx('content')}>
                            <Header title="Account" />
                            {MOBILE_USER_MENU_OPTIONS(t).map((option, key) => {
                                return (
                                    <NavOptionItem
                                        key={key}
                                        title={option.title}
                                        to={option.to}
                                        onClick={() => handleMenuChange(option)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className={cx('list')}>
                    <div className={cx('content')}>
                        <Header title="Category" />

                        <NavLink className={(nav) => cx('nav-item', { active: nav.isActive })} to={routes.home}>
                            <span className={cx('title')}>
                                <Trans>Home</Trans>
                            </span>
                        </NavLink>
                        <NavLink className={(nav) => cx('nav-item', { active: nav.isActive })} to={routes.playingNow}>
                            <span className={cx('title')}>
                                <Trans>Newest Movie</Trans>
                            </span>
                        </NavLink>
                        <NavLink className={(nav) => cx('nav-item', { active: nav.isActive })} to={routes.moive}>
                            <span className={cx('title')}>
                                <Trans>Movie</Trans>
                            </span>
                        </NavLink>
                        <NavLink className={(nav) => cx('nav-item', { active: nav.isActive })} to={routes.seriesMovie}>
                            <span className={cx('title')}>
                                <Trans>Series Movie</Trans>
                            </span>
                        </NavLink>
                        <NavLink className={(nav) => cx('nav-item', { active: nav.isActive })} to={routes.tvShows}>
                            <span className={cx('title')}>
                                <Trans>TV Shows</Trans>
                            </span>
                        </NavLink>
                    </div>
                </div>

                <div className={cx('list')}>
                    <div className={cx('content')}>
                        <Header title="Language" />
                        <NavOptionItem title="English" onClick={() => hangleChangeLanguage('en')} />
                        <NavOptionItem title="Vietnamese" onClick={() => hangleChangeLanguage('vi')} />
                    </div>
                </div>

                <div className={cx('list')}>
                    <div className={cx('content')}>
                        <Header title="Support" />
                        {MOBILE_MENU_OPTIONS(t).map((option, key) => {
                            return <NavOptionItem key={key} title={option.title} to={option.to} />;
                        })}
                    </div>
                </div>
            </Popper>

            {/* <button className={cx('close-icon')} onClick={handleHideSideBar}>
                <FontAwesomeIcon icon={faCircleXmark} />
            </button> */}
        </div>
    );
}

export default NavOptions;

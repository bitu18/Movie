import Tippy from '@tippyjs/react/headless';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Trans } from 'react-i18next';

import styles from './Navigation.module.scss';
import routes from '~/config/routes';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

const listCategory = [
    { name: 'Historical' },
    { name: 'Action' },
    { name: 'Adventure' },
    { name: 'Biography' },
    { name: 'Cartoon' },
    { name: 'Comedy' },
    // { name: 'Courtroom drama' },
    { name: 'Romance' },
    { name: 'Documentary' },
    { name: 'Drama' },
    { name: 'Family' },
    { name: 'Horror' },
    { name: 'Musical' },
    { name: 'Martial' },
    { name: 'Sci-fi' },
    { name: 'Thriller' },
    { name: 'Tragedy' },
    // { name: 'Crime and Gangster' },
    { name: 'War' },
];

const listNation = [
    { name: 'U.S. UK' },
    { name: 'Japan' },
    { name: 'Thailand' },
    { name: 'Indonesia' },
    { name: 'Korea' },
    { name: 'Taiwan' },
    { name: 'India' },
    { name: 'Singapore' },
    { name: 'China' },
    { name: 'Hong Kong' },
    { name: 'Philippines' },
    { name: 'England' },
    { name: 'Vietnam' },
    { name: 'Other Countries' },
];

function Navigation() {
    // useEffect(() => {
    //     apiService
    //         .category(sortActive)
    //         .then((res) => console.log(res))
    //         .catch((err) => console.error('Error'));
    // }, [sortActive]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid wide')}>
                <div className={cx('nav-list')}>
                    <NavLink className={(nav) => cx('nav-item', { active: nav.isActive })} to={routes.home}>
                        <span className={cx('title')}>
                            <Trans>Home</Trans>
                        </span>
                    </NavLink>
                    {/* <div>
                        <Tippy
                            interactive
                            offset={[0, 2]}
                            placement="bottom-start"
                            render={(attrs) => (
                                <div className={cx('menu-category')} tabIndex="-1" {...attrs}>
                                    <Popper className={cx('menu-popper-option')}>
                                        {listCategory.map((list, index) => (
                                            <NavigationMenu key={index} list={list}></NavigationMenu>
                                        ))}
                                    </Popper>
                                </div>
                            )}
                        >
                            <Button
                                className={cx('nav-item')}
                                rightIcon={<FontAwesomeIcon className={cx('down-icon')} icon={faSortDown} />}
                            >
                                <Trans>Category</Trans>
                            </Button>
                        </Tippy>
                    </div>

                    <div>
                        <Tippy
                            interactive
                            offset={[0, 2]}
                            placement="bottom-start"
                            render={(attrs) => (
                                <div className={cx('menu-category')} tabIndex="-1" {...attrs}>
                                    <Popper className={cx('menu-popper-option')}>
                                        {listNation.map((list, index) => (
                                            <NavigationMenu key={index} list={list}></NavigationMenu>
                                        ))}
                                    </Popper>
                                </div>
                            )}
                        >
                            <Button
                                className={cx('nav-item')}
                                rightIcon={<FontAwesomeIcon className={cx('down-icon')} icon={faSortDown} />}
                            >
                                <Trans>Nation</Trans>
                            </Button>
                        </Tippy>
                    </div> */}

                    <NavLink className={(nav) => cx('nav-item', { active: nav.isActive })} to={routes.playingNow}>
                        <span className={cx('title')}>
                            <Trans>Playing Now</Trans>
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
        </div>
    );
}

export default Navigation;

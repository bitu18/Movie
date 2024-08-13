import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from './Sidebar/Sidebar';
import styles from './SidebarLayout.module.scss';
import Navigation from '../components/Navigation';
import Slider from '~/components/Slider';
import config from '~/config';

const cx = classNames.bind(styles);

function SidebarLayout({ children }) {
    const location = useLocation();
    const isHomePage = location.pathname === config.routes.home;

    return (
        <>
            <Header />
            <Navigation />
            {isHomePage && <Slider />}
            <div className={cx('content-wrapper')}>
                <div className={cx('grid wide')}>
                    <div className={cx('row')}>
                        <div className={cx('list-movie col l-9 c-12')}>{children}</div>
                        <div className={cx(`sidebar col l-3 ${isHomePage ? 'c-0' : ''}`)}>
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

SidebarLayout.prototype = {
    children: PropTypes.node.isRequired,
};

export default SidebarLayout;

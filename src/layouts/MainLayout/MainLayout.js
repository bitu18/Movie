import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    return (
        <>
            <Header />
            <Navigation />
            <div className={cx('wrapper', 'content-width')}>
                <div className={cx('row')}>
                    <div className={cx('list-movie', 'col l-12 c-12')}>{children}</div>
                </div>
            </div>
            <Footer />
        </>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;

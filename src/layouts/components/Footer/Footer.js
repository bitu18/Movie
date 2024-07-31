import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import Image from '~/components/Image';
import img from '~/assets/imgs';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faEnvelope, faFileSignature, faGear, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Trans } from 'react-i18next';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

function Footer() {
    const handleEmailClick = () => {
        window.location.href = 'mailto:tungocanh173@gmail.com'; // NO SPACES
    };
    return (
        <footer className={cx('footer')}>
            <div className={cx('grid wide')}>
                <div className={cx('wrapper-infor')}>
                    <div className={cx('row')}>
                        <div className={cx('col l-4')}>
                            <div className={cx('logo')}>
                                <Image src={img.logo} alt="logo-movie" className={cx('img')} />
                            </div>
                            <div className={cx('wrapper-text')}>
                                <p className={cx('intro')}>
                                    <a href={routes.home}>Watch Free Movie </a>
                                    <Trans>
                                        is the most watched free TV and movie. Movie sources are compiled from major
                                        websites with diverse genres. They are helping users have a great experience
                                        with varied and user-friendly interface design.
                                    </Trans>
                                </p>
                            </div>
                        </div>
                        <div className={cx('col l-4')}>
                            <h2 className={cx('title', 'front-slash')}>
                                <Trans>Contact</Trans>
                            </h2>
                            <div className={cx('wrapper-text')}>
                                <Button
                                    onClick={handleEmailClick}
                                    href="/#"
                                    leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
                                    className={cx('icon')}
                                >
                                    tungocanh173@gmail.com
                                </Button>
                            </div>
                        </div>
                        <div className={cx('col l-4')}>
                            <h2 className={cx('title', 'front-slash')}>
                                <Trans>Support</Trans>
                            </h2>
                            <div className={cx('wrapper-text')}>
                                <Button href="/#" leftIcon={<FontAwesomeIcon icon={faGear} />} className={cx('icon')}>
                                    Setting
                                </Button>
                                <Button
                                    href="/#"
                                    leftIcon={<FontAwesomeIcon icon={faFileSignature} />}
                                    className={cx('icon')}
                                >
                                    Contact Support
                                </Button>
                                <Button
                                    href="/#"
                                    leftIcon={<FontAwesomeIcon icon={faCircleQuestion} />}
                                    className={cx('icon')}
                                >
                                    Help Center
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('wrapper-copyright')}>
                <p>Copyright © 2024 Watch Free Movie</p>
                <p>
                    Made with
                    <span className={cx('heart-icon')}>
                        <FontAwesomeIcon icon={faHeart} />
                    </span>
                    by Bitu
                </p>
            </div>
        </footer>
    );
}

export default Footer;

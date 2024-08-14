import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Trans } from 'react-i18next';

import Button from '~/components/Button';
import styles from './HeaderListMovie.module.scss';

const cx = classNames.bind(styles);

function HeaderListMovie({ title, viewAll }) {
    let navigateToPage = useNavigate();

    // Remove any whitespace characters from the title to avoid routing issues

    /* /\s+/g: This regex pattern matches one or more whitespace characters (\s+), 
    and the g flag ensures it replaces all occurrences globally in the string. */
    const trimSpaceBetweenTitle = title.replace(/\s+/g, '');

    const handleToPage = () => {
        if (trimSpaceBetweenTitle) {
            navigateToPage(`/${trimSpaceBetweenTitle}`);
            window.scrollTo(0, 0); // Scroll to the top of the page
        }
    };
    return (
        <header className={cx('header')}>
            <h2 className={cx('movie-category')}>
                <Trans>{title}</Trans>
            </h2>
            {viewAll && (
                <Button
                    className={cx('view-all')}
                    leftIcon={<FontAwesomeIcon icon={faPlay} className={cx('icon')} />}
                    onClick={handleToPage}
                >
                    View all
                </Button>
            )}
        </header>
    );
}

export default HeaderListMovie;

import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

import styles from './PopperForm.module.scss';

const cx = classNames.bind(styles);
function PopperForm({ children, className, onHandleHideForm }) {
    const handleClickForm = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={cx('overlay', className)} onClick={onHandleHideForm}>
            <div className={cx('form')} onClick={handleClickForm}>
                <button className={cx('close-icon')} onClick={onHandleHideForm}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
                {children}
            </div>
        </div>
    );
}

PopperForm.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onHandleHideForm: PropTypes.func,
};

export default PopperForm;

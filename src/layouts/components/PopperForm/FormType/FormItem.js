import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './FormType.module.scss';

const cx = classNames.bind(styles);
function FormItem({ title, name, value, type, placeholder, errorMessage, onHandleChange, onHandleBlur }) {
    return (
        <div className={cx('form-group', { invalid: errorMessage })}>
            <label className={cx('form-label')}>{title}</label>
            <input
                name={name}
                value={value}
                type={type}
                className={cx('input')}
                placeholder={placeholder}
                onChange={onHandleChange}
                onBlur={onHandleBlur}
            />
            <span className={cx('form-message')}>{errorMessage}</span>
        </div>
    );
}

FormItem.propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    onHandleChange: PropTypes.func.isRequired,
    onHandleBlur: PropTypes.func.isRequired,
};

export default FormItem;

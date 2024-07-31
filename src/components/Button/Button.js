import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { forwardRef } from 'react'; // Import forwardRef from React
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Trans } from 'react-i18next';

const cx = classNames.bind(styles);

const Button = forwardRef(
    (
        {
            children,
            to,
            href,
            primary = false,
            outline = false,
            border = false,
            text = false,
            small = false,
            medium = false,
            disabled = false,
            leftIcon = false,
            rightIcon = false,
            underlineActive = false,
            className,
            onClick,
            ...passProps
        },
        ref, // Destructure ref from props
    ) => {
        let Comp = 'button';
        const props = {
            onClick,
            ...passProps,
        };

        if (to) {
            props.to = to;
            Comp = Link;
        } else if (href) {
            props.href = href;
            Comp = 'a';
        }

        const classes = cx('wrapper', {
            primary,
            outline,
            border,
            text,
            small,
            medium,
            disabled,
            leftIcon,
            underlineActive,
            [className]: className,
        });

        if (disabled) {
            // Remove event handlers if disabled
            Object.keys(props).forEach((key) => {
                if (key.startsWith('on') && typeof props[key] === 'function') {
                    delete props[key];
                }
            });
        }

        return (
            <Comp ref={ref} className={classes} {...props}>
                {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
                <span className={cx('title')}>
                    <Trans>{children}</Trans>
                </span>
                {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
            </Comp>
        );
    },
);

Button.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    link: PropTypes.string,
    primary: PropTypes.bool,
    border: PropTypes.bool,
    text: PropTypes.bool,
    outline: PropTypes.bool,
    small: PropTypes.bool,
    medium: PropTypes.bool,
    disabled: PropTypes.bool,
    leftIcon: PropTypes.object,
    rightIcon: PropTypes.object,
    underlineActive: PropTypes.bool,
    href: PropTypes.string,
    passProps: PropTypes.object, // Additional props to pass to the underlying component (e.g., 'data-testid')
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;

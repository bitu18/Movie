import classNames from 'classnames/bind';

import styles from './PlayingNow.module.scss';
import FetchDataMovie from '~/components/FetchDataMovie';

const cx = classNames.bind(styles);
function UpdatestMovie() {
    return <FetchDataMovie title="Playing Now" slug="phim-dang-chieu" />;
}

export default UpdatestMovie;

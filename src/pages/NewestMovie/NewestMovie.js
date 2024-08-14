import classNames from 'classnames/bind';

import styles from './NewestMovie.module.scss';
import FetchDataMovie from '~/components/FetchDataMovie';

const cx = classNames.bind(styles);
function NewestMovie() {
    return <FetchDataMovie title="Newest Movie" slug="phim-dang-chieu" />;
}

export default NewestMovie;

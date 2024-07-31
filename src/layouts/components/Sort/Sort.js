import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { forwardRef, memo } from 'react';

import styles from './Sort.module.scss';
import Button from '~/components/Button';
import { Trans, useTranslation } from 'react-i18next';

const listYear = [
    { name: 'year', slug: 'year' },
    { name: '2024', slug: '2024' },
    { name: '2023', slug: '2023' },
    { name: '2022', slug: '2022' },
    { name: '2021', slug: '2021' },
    { name: '2020', slug: '2020' },
    { name: '2019', slug: '2019' },
    { name: '2018', slug: '2018' },
    { name: '2017', slug: '2017' },
    { name: '2016', slug: '2016' },
    { name: '2015', slug: '2015' },
    { name: '2014', slug: '2014' },
    { name: '2013', slug: '2013' },
    { name: '2012', slug: '2012' },
    { name: '2011', slug: '2011' },
    { name: '2010', slug: '2010' },
    { name: '2009', slug: '2009' },
    { name: '2008', slug: '2008' },
    { name: '2007', slug: '2007' },
    { name: '2006', slug: '2006' },
    { name: '2005', slug: '2005' },
    { name: '2004', slug: '2004' },
    { name: '2003', slug: '2003' },
    { name: '2002', slug: '2002' },
    { name: '2001', slug: '2001' },
    { name: '2000', slug: '2000' },
    { name: 'Before 2000', slug: 'truoc 2000' },
];

const listGenre = [
    { name: 'Category', slug: 'the loai' },
    { name: 'Action', slug: 'hanh-dong' },
    { name: 'Adventure', slug: 'phieu-luu' },
    { name: 'Cartoon', slug: 'hoat-hinh' },
    { name: 'Comedy', slug: 'phim-hai' },
    { name: 'Criminal', slug: 'hinh-su' },
    { name: 'Documentary', slug: 'tai-lieu' },
    { name: 'Drama', slug: 'chinh-kich' },
    { name: 'Family', slug: 'gia-dinh' },
    { name: 'Fantasy', slug: 'gia-tuong' },
    { name: 'Historical', slug: 'lich-su' },
    { name: 'Horror', slug: 'kinh-di' },
    { name: 'Musical', slug: 'nhac' },
    { name: 'Mystery', slug: 'bi-an' },
    { name: 'Romance', slug: 'lang-man' },
    { name: 'Science-Fiction', slug: 'khoa-hoc-vien-tuong' },
    { name: 'Thriller', slug: 'gay-can' },
    { name: 'War', slug: 'chien-tranh' },
    { name: 'Melodrama', slug: 'tam-ly' },
    { name: '18+', slug: 'phim-18' },
];

const listNation = [
    { name: 'Nation', slug: 'nation' },
    { name: 'US', slug: 'au-my' },
    { name: 'UK', slug: 'anh' },
    { name: 'China', slug: 'trung-quoc' },
    { name: 'Indonesia', slug: 'indonesia' },
    { name: 'Vietnam', slug: 'viet-nam' },
    { name: 'France', slug: 'phap' },
    { name: 'Hong Kong', slug: 'hong-kong' },
    { name: 'Korea', slug: 'han-quoc' },
    { name: 'Japan', slug: 'nhat-ban' },
    { name: 'Thailand', slug: 'thai-lan' },
    { name: 'Taiwan', slug: 'dai-loan' },
    { name: 'Russia', slug: 'nga' },
    { name: 'Netherlands', slug: 'ha-lan' },
    { name: 'Philippines', slug: 'philippines' },
    { name: 'India', slug: 'an-do' },
    { name: 'Other Countries', slug: 'quoc-gia-khac' },
];

const cx = classNames.bind(styles);
const Sort = forwardRef(({ showControlSelect = true, moveNextPage, movePrevPage, onHandleSortChange }, ref) => {
    const { t } = useTranslation();

    const handleYearchange = (e) => {
        onHandleSortChange('year', e.target.value);
    };

    const handleGenreChange = (e) => {
        onHandleSortChange('genre', e.target.value);
    };

    const handleNationChange = (e) => {
        onHandleSortChange('nation', e.target.value);
    };

    return (
        <div ref={ref} className={cx('wrapper')}>
            {showControlSelect && (
                <div className={cx('sort-container')}>
                    <div className={cx('control-select-box')}>
                        <select onChange={handleYearchange}>
                            {listYear.map((year, index) => (
                                <option key={index} value={year.name}>
                                    <Trans>{year.name}</Trans>
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={cx('control-select-box')}>
                        <select onChange={handleGenreChange}>
                            {listGenre.map((genre, index) => (
                                <option key={index} value={genre.slug}>
                                    <Trans>{genre.name}</Trans>
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={cx('control-select-box')}>
                        <select onChange={handleNationChange}>
                            {listNation.map((nation, index) => (
                                <option key={index} value={nation.slug}>
                                    <Trans>{nation.name}</Trans>
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            <div className={cx('btn-navigation')}>
                <Button
                    onClick={movePrevPage}
                    className={cx('btn')}
                    leftIcon={<FontAwesomeIcon icon={faCaretLeft} className={cx('icon')} />}
                >
                    <p className={cx('title-prev')}>
                        <Trans>Prev Page</Trans>
                    </p>
                </Button>
                <Button
                    onClick={moveNextPage}
                    className={cx('btn')}
                    rightIcon={<FontAwesomeIcon icon={faCaretRight} className={cx('icon')} />}
                >
                    <p className={cx('title-next')}>
                        <Trans>Next Page</Trans>
                    </p>
                </Button>
            </div>
        </div>
    );
});

Sort.propTypes = {
    showControlSelect: PropTypes.bool,
    moveNextPage: PropTypes.func,
    movePrevPage: PropTypes.func,
    onHandleSortChange: PropTypes.func,
};

export default memo(Sort);

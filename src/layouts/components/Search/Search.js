import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import * as apiService from '~/apiService/searchService';
import MovieSearch from '~/components/MovieSearch';
import Popper from '~/components/Popper';
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search({ data }) {
    const { t } = useTranslation();

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    let navigateToSearchPage = useNavigate();

    const delaySearch = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!searchValue) {
            setSearchResult([]);
            return;
        }
        setLoading(true);

        apiService
            .search(searchValue)
            .then((res) => {
                setSearchResult(res.items);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });

        // encodeURIComponent => encode characters like @,#,&,% so that it not throw errors
        // fetch(`https://phim.nguonc.com/api/films/search?keyword=${encodeURIComponent(searchValue)}`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setSearchResult(data.items);
        //         setLoading(false);
        //     })
        //     .catch(() => {
        //         setLoading(false);
        //     });
    }, [delaySearch]);

    const inputRef = useRef();

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleSubmitResult = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            if (searchValue) {
                navigateToSearchPage(`videoDetail/${searchValue}`);
                setShowResult(false);
            }
        }
    };

    return (
        /* Using a wrapper <div> or <span> tag around the reference element
        solves this by creating a new parentNode context. */
        <div>
            <Tippy
                visible={showResult && searchResult.length > 0}
                offset={[0, 6]}
                interactive
                placement="bottom"
                // appendTo={() => document.body}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <Popper>
                            {searchResult.map((result) => (
                                <MovieSearch key={result.id} data={result} />
                            ))}
                        </Popper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        value={searchValue}
                        ref={inputRef}
                        type="text"
                        placeholder={t('Search your movie')}
                        onChange={(e) => setSearchValue(e.target.value.trimStart())}
                        onFocus={() => setShowResult(true)}
                        onKeyDown={handleSubmitResult}
                    />

                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />}

                    <button className={cx('search-btn')} onClick={handleSubmitResult}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;

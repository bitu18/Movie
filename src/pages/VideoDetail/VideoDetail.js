import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular, faCirclePlay } from '@fortawesome/free-regular-svg-icons';

import styles from './VideoDetail.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import * as apiService from '~/apiService';
import FetchVideo from './FetchVideo';
import Episodes from './Episodes';
import LoadingSpinner from '~/components/loadingSpinner';
import { useWatchlist } from '~/store';

const cx = classNames.bind(styles);

function VideoDetail() {
    const { i, i18n } = useTranslation();
    const isEnglish = i18n.language === 'en';

    const { slug, serverName, episodeSlug } = useParams(); // Get slug from URL
    const { watchlist, isMarked, setIsMarked, handleAddWatchlist, handleRemoveWatchlist } = useWatchlist();

    const [movieInfor, setMovieInfor] = useState(null);
    const [video, setVideo] = useState(null);
    const [episodeServer, setEpisodeServer] = useState([]);
    const [activeServer, setActiveServer] = useState();
    const [activeEpisode, setActiveEpisode] = useState();
    const [loading, setLoading] = useState(true);

    const watchRef = useRef();

    // Get API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiService.movieInfor(slug);
                const episodes = res.movie?.episodes || [];
                setMovieInfor(res.movie);
                setEpisodeServer(episodes);

                const defaultServer = episodes[0]?.server_name;
                const defaultEpisode = episodes[0]?.items[0]?.slug;

                const newServer = episodes.find((server) => server.server_name === serverName) || episodes[0];
                const newEpisode = newServer?.items.find((item) => item.slug === episodeSlug) || newServer?.items[0];

                setActiveServer(newServer.server_name);
                setActiveEpisode(newEpisode.slug);
                setVideo(newEpisode);

                setLoading(false);
            } catch (err) {
                console.error('Error:', err);
                setLoading(false);
            }
        };

        fetchData();
    }, [slug, serverName, episodeSlug]);

    const englishTitle = isEnglish ? movieInfor?.original_name : movieInfor?.name;
    const vietnameseTitle = isEnglish ? movieInfor?.name : movieInfor?.original_name;

    const handleScroll = () => {
        setTimeout(() => {
            if (watchRef.current) {
                watchRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100); // Adjust the timeout duration if needed
    };

    const handleChangeServer = async (serverName) => {
        setLoading(true);
        try {
            const newServer = episodeServer.find((server) => server.server_name === serverName);

            setActiveServer(serverName);

            if (newServer && newServer.items.length > 0) {
                const newEpisode = newServer.items[0];
                setActiveEpisode(newEpisode.slug);
                setVideo(newEpisode);

                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }

        handleScroll();
    };

    const handleChangeItem = async (itemSlug) => {
        setLoading(true);
        try {
            const newServer = episodeServer.find((server) => server.server_name === activeServer);
            const newEpisode = newServer.items.find((item) => item.slug === itemSlug);

            await new Promise((resolve) => setTimeout(resolve, 1000));

            setActiveEpisode(itemSlug);
            setVideo(newEpisode);
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }

        handleScroll();
    };

    const handleMovieMarked = () => {
        // Check if the current movie is already in the watchlist
        const isInWatchlist = watchlist.some((item) => item.id === movieInfor.id);

        if (isInWatchlist) {
            handleRemoveWatchlist(movieInfor);
        } else {
            handleAddWatchlist(movieInfor);
        }
    };

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className={cx('wrapper-movie')}>
                        <div className={cx('movie-poster')}>
                            <Image src={movieInfor?.thumb_url} alt={movieInfor?.name} className={cx('movie-thumb')} />
                            <div className={cx('wrapper-btn')}>
                                <Button
                                    border
                                    primary
                                    className={cx('btn--play')}
                                    onClick={handleScroll}
                                    leftIcon={<FontAwesomeIcon icon={faCirclePlay} className={cx('icon-btn')} />}
                                >
                                    Watch
                                </Button>
                                <Button
                                    border
                                    outline
                                    className={cx('btn--share')}
                                    leftIcon={
                                        watchlist.some((item) => item.id === movieInfor.id) ? (
                                            <FontAwesomeIcon icon={faBookmarkSolid} className={cx('icon-btn')} />
                                        ) : (
                                            <FontAwesomeIcon icon={faBookmarkRegular} className={cx('icon-btn')} />
                                        )
                                    }
                                    onClick={handleMovieMarked}
                                >
                                    Watch later
                                </Button>
                            </div>
                        </div>

                        <div className={cx('movie-infor')}>
                            <div className={cx('header-infor')}>
                                <h2 className={cx('title-eng')}>{englishTitle}</h2>
                                <h3 className={cx('title-vi')}>{vietnameseTitle}</h3>
                            </div>

                            <div className={cx('content')}>
                                <div className={cx('filed')}>
                                    <p className={cx('name')}>
                                        <Trans>Duration</Trans>:
                                    </p>
                                    <p className={cx('value')}>{movieInfor?.time}</p>
                                </div>
                                <div className={cx('filed')}>
                                    <p className={cx('name')}>
                                        <Trans>Year</Trans>:
                                    </p>
                                    <p className={cx('value')}>{movieInfor?.category?.['3'].list?.[0]?.name}</p>
                                </div>
                                <div className={cx('filed')}>
                                    <p className={cx('name')}>
                                        <Trans>Director</Trans>:
                                    </p>
                                    <p className={cx('value')}>{movieInfor?.director}</p>
                                </div>
                                <div className={cx('filed')}>
                                    <p className={cx('name')}>
                                        <Trans>Starring</Trans>:
                                    </p>
                                    <p className={cx('value')}>{movieInfor?.casts}</p>
                                </div>
                                <div className={cx('filed')}>
                                    <p className={cx('name')}>
                                        <Trans>Genre</Trans>:
                                    </p>
                                    <p className={cx('value')}>
                                        {movieInfor?.category?.['2']?.list?.map((item) => item.name).join(', ')}
                                    </p>
                                </div>
                                <div className={cx('filed')}>
                                    <p className={cx('name')}>
                                        <Trans>Nation</Trans>:
                                    </p>
                                    <p className={cx('value')}>{movieInfor?.category?.['4']?.list?.['0']?.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('movie-content')}>
                        <h2 className={cx('header-content', 'front-slash')}>
                            <Trans>Movie Content</Trans>
                        </h2>
                        <p className={cx('description')}>{movieInfor?.description}</p>
                    </div>

                    <div className={cx('movie-video')}>
                        <h2 className={cx('header-content', 'front-slash')}>
                            <Trans>Movie Video</Trans>
                        </h2>
                        <div ref={watchRef} className={cx('header-infor')}>
                            <h2 className={cx('title-eng')}>{englishTitle}</h2>
                            <h3 className={cx('title-vi')}>{vietnameseTitle}</h3>
                        </div>

                        {/* Fetch Video */}
                        <FetchVideo movieDetail={video} loading={loading} setLoading={setLoading} />
                    </div>

                    <Episodes
                        movieInfor={movieInfor}
                        episodeServer={episodeServer}
                        activeServer={activeServer}
                        activeEpisode={activeEpisode}
                        onHandleChangeServer={handleChangeServer}
                        onHandleChangeItem={handleChangeItem}
                        onHandleScroll={handleScroll}
                    />
                </>
            )}
        </>
    );
}

export default VideoDetail;

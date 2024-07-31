import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './VideoDetail.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import * as apiService from '~/apiService';
import FetchVideo from './FetchVideo';
import Episodes from './Episodes';
import { Trans, useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function VideoDetail() {
    const { i, i18n } = useTranslation();
    const isEnglish = i18n.language === 'en';

    const { slug, serverName, episodeSlug } = useParams(); // Get slug from URL
    const [movieInfor, setMovieInfor] = useState(null);
    const [video, setVideo] = useState(null);
    const [episodeServer, setEpisodeServer] = useState([]);
    const [activeServer, setActiveServer] = useState(localStorage.getItem('activeServer'));
    const [activeEpisode, setActiveEpisode] = useState(localStorage.getItem('activeEpisode'));

    const navigate = useNavigate();
    const watchRef = useRef();

    // Get API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiService.movieInfor(slug);
                const episodes = res.movie?.episodes || [];
                setMovieInfor(res.movie);
                setEpisodeServer(episodes);

                // Default to the first server & episode if none are active or if it's a new movie
                if (!activeServer || !activeEpisode || activeServer !== serverName || activeEpisode !== episodeSlug) {
                    const defaultServer = episodes[0].server_name;
                    const defaultEpisode = episodes[0].items[0].slug;
                    setActiveServer(defaultServer);
                    setActiveEpisode(defaultEpisode);
                    setVideo(episodes[0].items[0]);

                    navigate(`/videoDetail/${slug}/${defaultServer}/${defaultEpisode}`, { replace: true });
                } else {
                    const currentServer = episodes.find((server) => server.server_name === serverName);
                    const currentEpisode = currentServer.items.find((item) => item.slug === episodeSlug);
                    setVideo(currentEpisode);
                }
            } catch (err) {
                console.error('Error:', err);
            }
        };

        fetchData();
    }, [slug]);

    // Save to local storage
    useEffect(() => {
        if (activeServer) {
            localStorage.setItem('activeServer', activeServer);
        }
        if (activeEpisode) {
            localStorage.setItem('activeEpisode', activeEpisode);
        }
    }, [activeEpisode, activeServer]);

    const handleScroll = () => {
        if (watchRef.current) {
            watchRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleChangeServer = (serverName) => {
        const newServer = episodeServer.find((server) => server.server_name === serverName);
        const newEpisode = newServer.items[0];
        setActiveServer(serverName);
        setActiveEpisode(newEpisode.slug);
        setVideo(newEpisode);

        navigate(`/videoDetail/${movieInfor.slug}/${serverName}/${newEpisode.slug}`);
        handleScroll();
    };

    const handleChangeItem = (itemSlug) => {
        const newServer = episodeServer.find((server) => server.server_name === activeServer);
        const newEpisode = newServer.items.find((item) => item.slug === itemSlug);
        setActiveEpisode(itemSlug);
        setVideo(newEpisode);

        navigate(`/videoDetail/${movieInfor.slug}/${activeServer}/${itemSlug}`);
        handleScroll();
    };

    return (
        <>
            <div className={cx('wrapper-movie')}>
                <div className={cx('movie-poster')}>
                    <Image src={movieInfor?.thumb_url} alt={movieInfor?.name} className={cx('movie-thumb')} />
                    <div className={cx('wrapper-btn')}>
                        <Button border outline>
                            Share
                        </Button>
                        <Button border primary onClick={handleScroll}>
                            Watch
                        </Button>
                    </div>
                </div>

                <div className={cx('movie-infor')}>
                    <div className={cx('header-infor')}>
                        {isEnglish ? (
                            <>
                                <h2 className={cx('title-eng')}>{movieInfor?.original_name}</h2>
                                <h3 className={cx('title-vi')}>{movieInfor?.name}</h3>
                            </>
                        ) : (
                            <>
                                <h2 className={cx('title-eng')}>{movieInfor?.name}</h2>
                                <h3 className={cx('title-vi')}>{movieInfor?.original_name}</h3>
                            </>
                        )}
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
                    {isEnglish ? (
                        <>
                            <h2 className={cx('title-eng')}>{movieInfor?.original_name}</h2>
                            <h3 className={cx('title-vi')}>{movieInfor?.name}</h3>
                        </>
                    ) : (
                        <>
                            <h2 className={cx('title-eng')}>{movieInfor?.name}</h2>
                            <h3 className={cx('title-vi')}>{movieInfor?.original_name}</h3>
                        </>
                    )}
                </div>

                {/* Fetch Video */}
                <FetchVideo movieDetail={video} />
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
    );
}

export default VideoDetail;

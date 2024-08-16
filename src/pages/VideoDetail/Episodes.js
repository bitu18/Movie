import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './VideoDetail.module.scss';
import Button from '~/components/Button';
import { Trans } from 'react-i18next';

const cx = classNames.bind(styles);

function Episodes({
    movieInfor,
    episodeServer,
    activeServer,
    activeEpisode,
    onHandleChangeServer,
    onHandleChangeItem,
}) {
    return (
        <>
            <div className={cx('server')}>
                <h4 className={cx('text')}>Server</h4>
                {episodeServer.length > 0 &&
                    episodeServer.map((server) => (
                        <NavLink
                            // to={`/videoDetail/${movieInfor.slug}/${server.server_name}`}
                            className={(nav) => cx('btn', { active: activeServer === server.server_name && 'active' })}
                            onClick={() => {
                                onHandleChangeServer(server.server_name);
                            }}
                            key={server.server_name}
                        >
                            <span className={cx('server-name')}>
                                <Trans>{server.server_name}</Trans>
                            </span>
                        </NavLink>
                    ))}
            </div>

            <div className={cx('episode')}>
                <h4 className={cx('text')}>Episode</h4>
                {episodeServer
                    .find((server) => server.server_name === activeServer)
                    ?.items.map((item) => (
                        <NavLink
                            // to={`/videoDetail/${movieInfor.slug}/${activeServer}/${item.slug}`}
                            className={(nav) => cx('btn', { active: activeEpisode === item.slug && 'active' })}
                            onClick={() => {
                                onHandleChangeItem(item.slug);
                            }}
                            key={item.name}
                        >
                            <span className={cx('episode-name')}>{item.name}</span>
                        </NavLink>
                    ))}
            </div>
        </>
    );
}

Episodes.proTypes = {
    movieInfor: PropTypes.object,
    episodeServer: PropTypes.array,
    activeServer: PropTypes.string,
    activeEpisode: PropTypes.string,
    onHandleChangeServer: PropTypes.func,
    onHandleChangeItem: PropTypes.func,
    onHandleScroll: PropTypes.func,
};

export default Episodes;

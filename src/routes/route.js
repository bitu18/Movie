// Layouts
import { SidebarLayout } from '~/layouts';

import Home from '~/pages/Home';
import Search from '~/pages/Search';
import Movie from '~/pages/Movie';
import SeriesMovie from '~/pages/SeriesMovie';
import TvShows from '~/pages/TvShows';
import NewestMovie from '~/pages/NewestMovie';
import VideoDetail from '~/pages/VideoDetail';
import Account from '~/pages/Account';
import config from '~/config';

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: SidebarLayout },
    { path: config.routes.search, component: Search },
    { path: config.routes.moive, component: Movie },
    { path: config.routes.seriesMovie, component: SeriesMovie },
    { path: config.routes.newestMovie, component: NewestMovie },
    { path: config.routes.tvShows, component: TvShows },
    { path: config.routes.videoDetail, component: VideoDetail, layout: SidebarLayout },
    { path: config.routes.account, component: Account },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

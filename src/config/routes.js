const routes = {
    home: '/',
    search: '/search',
    moive: '/movie',
    seriesMovie: '/seriesMovie',
    newestMovie: '/newestMovie',
    tvShows: '/tvShows',
    // '?' means it can be or can not be had the slug
    videoDetail: '/videoDetail/:slug/:serverName?/:episodeSlug?',
    account: 'account/:nickname',
};

export default routes;

import request from '~/untils/httpRequest';

export const typesList = [
    {
        name: 'Series Movie',
        slug: 'phim-bo',
    },
    {
        name: 'Movie',
        slug: 'phim-le',
    },
    {
        name: 'Tv Shows',
        slug: 'tv-shows',
    },
    {
        name: 'Playing Now',
        slug: 'phim-dang-chieu',
    },
];

export const category = async (typeSlug, page = 1) => {
    try {
        const res = await request.get(`films/danh-sach/${typeSlug}`, {
            params: {
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error fetching category:', error);
        throw error;
    }
};

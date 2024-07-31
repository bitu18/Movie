import request from '~/untils/httpRequest';

export const search = async (keyword) => {
    try {
        const res = await request.get('films/search?', {
            params: {
                keyword,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// export const search = (keyword) => {
//     return request
//         .get('films/search?', {
//             params: {
//                 keyword,
//             },
//         })
//         .then((res) => {
//             return res.data;
//         })
//         .catch((error) => {
//             console.log(error);
//             throw error;
//         });
// };

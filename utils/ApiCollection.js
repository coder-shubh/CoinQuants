const { axiosInstance, request } = require("./ApiHandler");

export const PostdataFunction = async (url, data) => {
    const config = {
        method: 'post',
        url: `${url}`,
        data,
    };
    try {
        const result = await request(config);
        // console.log('response >>>>>>>>>>>>>>>>>>>>>>>', JSON.stringify(result));
        if (result.data?.status == 200 || result.data?.status == 201) {
            return {
                success: true,
                data: result.data,
            };
        } else {
            // console.log(result, '1');
            return {
                success: false,
                data: result,
            };
        }
    } catch (err) {
        // console.log(err, '2');
        return {
            success: false,
            data: err,
        };
    }
};



export const PatchdataFunction = async (url, data) => {
    const config = {
        method: 'patch',
        url: `${url}`,


        data,
    };
    try {
        const result = await request(config);
        // console.log('response >>>>>>>>>>>>>>>>>>>>>>>', JSON.stringify(result));
        if (result.data?.status == 200 || result.data?.status == 201) {
            return {
                success: true,
                data: result.data,
            };
        } else {
            // console.log(result, '1');
            return {
                success: false,
                data: result,
            };
        }
    } catch (err) {
        // console.log(err, '2');
        return {
            success: false,
            data: err,
        };
    }
};


export const PatchImageFunction = async (url, data) => {
    const formData = new FormData();

    formData.append('profile_image', {
        uri: data,
        type: 'image/jpeg',
        name: 'profiles.jpg',
    });

    const config = {
        method: 'patch',
        url: `${url}`,
        data: formData,

        // Set headers for sending form data
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    try {
        const result = await request(config);

        if (result.data?.status === 200 || result.data?.status === 201) {
            return {
                success: true,
                data: result.data,
            };
        } else {
            // console.log(result, '1');
            return {
                success: false,
                data: result,
            };
        }
    } catch (err) {
        // console.log(err, '2');
        return {
            success: false,
            data: err,
        };
    }
};





export const GetdataFunction = async (url) => {
    const config = {
        method: 'GET',
        url: `${url}`,

    };
    try {
        const result = await request(config);
        // console.log('response >>>>>>>>>>>>>>>>>>>>>>>', JSON.stringify(result));
        if (result.data?.status == 200 || result.data?.status == 201) {
            return {
                success: true,
                data: result.data,
            };
        } else {
            // console.log(result, '1');
            return {
                success: false,
                data: result,
            };
        }
    } catch (err) {
        // console.log(err, '2');
        return {
            success: false,
            data: err,
        };
    }
};


export const DeletedataFunction = async (url) => {
    const config = {
        method: 'DELETE', // Change the method to DELETE
        url: `${url}`,
    };
    try {
        const result = await request(config);
        // console.log('response >>>>>>>>>>>>>>>>>>>>>>>', JSON.stringify(result));
        if (result.data?.status === 200 || result.data?.status === 204) {
            // Assuming a successful DELETE request returns status 200 or 204
            return {
                success: true,
                data: result.data,
            };
        } else {
            // console.log(result, '1');
            return {
                success: false,
                data: result,
            };
        }
    } catch (err) {
        // console.log(err, '2');
        return {
            success: false,
            data: err,
        };
    }
};

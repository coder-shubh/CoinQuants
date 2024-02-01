import axios from 'axios';
// import {globalLocalStorage} from '../utils/localStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Globals from '../utils/Globals';
import { ToastAndroid } from 'react-native';

export const axiosInstance = axios.create({
  baseURL: `${Globals.API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(async function (response) {
  const newAccessToken = response.headers.get('x-access');

  if (
    newAccessToken &&
    newAccessToken !== (await AsyncStorage.getItem('AccesToken'))
  ) {
    await AsyncStorage.setItem('AccesToken', newAccessToken);
  }
  const newRefreshToken = response.headers.get('x-refresh');
  if (
    newRefreshToken &&
    newRefreshToken !== (await AsyncStorage.getItem('refreshtokent'))
  ) {
    await AsyncStorage.setItem('refreshtokent', newRefreshToken);
  }
  return response;
});

export const request = async config => {
  try {
    if (!config.headers) {
      config.headers = {};
    }
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    const accessToken = await AsyncStorage.getItem('AccesToken');
    const refreshToken = await AsyncStorage.getItem('refreshtokent');
    if (accessToken && refreshToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers['x-refresh'] = `${refreshToken}`;
    }

    const response = await axiosInstance.request({ ...config });
    // console.log('responce', response);


    return {
      remote: 'success',
      data: response,
    };
  } catch (error) {
    // console.log("error message", error.response.data);
    const errorMessage = Object.values(error.response.data)[0][0];
    alert(errorMessage || 'Unknown error');
    if (error.response.headers['x-access']) {
      await AsyncStorage.setItem(
        'AccesToken',
        error.response.headers['x-access'],
      );
    } else {
      if (error.response.status === 403 || error.response.status === 401) {
        await AsyncStorage.clear();
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });

      }
    }
    if (error) {
      if (error.response) {
        const axiosError = error;
        if (axiosError.response && axiosError.response.data) {
          let errorMessage = axiosError.response.data; // check for 500 to handle message defined by the app
          if (axiosError.response.status === 500) {
            errorMessage = {
              message: ['Internal Server Error'],
            };
          }
          for (const key in errorMessage) {
            errorMessage[key] = errorMessage[key][0];
          }
          return {
            remote: 'failure',
            error: {
              status: axiosError.response.status,
              errors: errorMessage,
            },
          };
        }
      } else {
        const axiosError = error;
        const errorMessage = axiosError.message;

        return {
          remote: 'failure',
          error: {
            errors: errorMessage,
          },
        };
      }
    }
    throw error;
  }
};

export const parseResponse = response => {
  const data = JSON.parse(response);
  if (data && (data.errors || data.error)) {
    return {
      remote: 'failure',
      error: {
        errors: data.errors ?? data.error,
      },
    };
  }
  return {
    remote: 'success',
    data,
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { axiosInstance, request, parseResponse };








// Call Get Api
export function getApiCall(param) {
  var url = param.url;
  console.log(Globals.API_URL.concat(url))
  return axios.get(Globals.API_URL.concat(url)).then((response) => {
    console.log("$$$$$$$44", response.data)
    return response.data;
  }).catch(error => {
    if (error.request.status == 400) {
      var errRes = JSON.parse(error.request._response);
      alert(errRes.message);
      return false;
    }
    else if (error.request.status == 401) {
      var errRes = JSON.parse(error.request._response);
      alert(errRes.message);
      return false;
    }

    if (error.toJSON().message === 'Network Error') {
      alert('no internet connection');
      // dispatch({type: RELOAD});
    }
    return error;
  });

}



export function postApi(param) {
  const AuthStr = 'Basic'.concat('App1app#123');
  var url = param.url;
  var json = param.json;
  console.log(Globals.API_URL.concat(url))
  console.log(Globals.token)
  console.log(json)

  return axios.post(Globals.API_URL.concat(url), json).then((response) => {
    if (response.status === 201 || response.status === 200) {
      return response || true;
    } else {
      return false;
    }
  }).catch(error => {
    if (error.response) {
      const status = error.response.status;
      const errRes = error.response.data;
      console.log(errRes)
      if (status === 400 || status === 401 || status === 500) {
        // alert(errRes.error[0]);
        const errorMessage = Object.values(errRes)[0][0];
        alert(errorMessage || 'Unknown error');
        return false;
      }
    } else if (error.message === 'Network Error') {
      alert('No internet connection');
      //  dispatch({type: RELOAD});
    }

    return error;
  });
}


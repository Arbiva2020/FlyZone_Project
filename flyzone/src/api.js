import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  // TODO: Set a timeout for production
  // timeout: DefaultNetworkConfig.networkRequestsTimeout,
  // the cookie is attached to the request automatically
});

export const getFromServer = (
  url,
  options={},
) => {
  return axiosInstance.get(url, options);
};

export const postToServer = (
  url,
  data,
  options={},
) => {
  return axiosInstance.post(url, data, options);
};

export const uploadToServer = (
  url,
  formData,
  options={},
) => {
  return axiosInstance.post(url, formData, options);
};

export const putToServer = (
  url,
  data,
  options={},
) => {
  return axiosInstance.put(url, data, options);
};

export const deleteFromServer = (
  url,
  options={},
) => {
  return axiosInstance.delete(url, options);
};

export const extractMessageFromError = (err) => {
  if (((err)?.response?.data)?.message) {
    return ((err)?.response?.data)
      ?.message;
  }
  if (typeof (err)?.response?.data === 'string') {
    return (err)?.response?.data;
  }
  if ((err).message) {
    return (err).message;
  }
  if (typeof err === 'string') {
    return err;
  }
  return 'Unknown error';
};
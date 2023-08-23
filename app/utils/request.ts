import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export class BadRequestError extends Error {
  url?: string;
  method?: string;
  body: any;
  statusCode?: number;
  arguments: any;
  retryCount?: number;
  
  constructor(info: {
    message: string,
    url: string,
    method: string,
    body?: any,
    statusCode: number,
    retryCount?: number
  }) {
    super(info.message);
    this.name = 'RL_STATS_REQUEST_ERROR';
    Object.assign(this, info);
  }
}

const defaultOptions: Partial<UtilRequestOptions> = { 
  retries: 1, 
  retryOnStatusCodes: [500, 502, 503] 
};

export const request = (inputOptions: UtilRequestOptions) => {
  const options: UtilRequestOptions = {
    ...defaultOptions,
    ...inputOptions,
    responseType: 'json',
    validateStatus: status => (status >= 200 && status < 300)
  };

  let retryCount = 0;

  const makeRequest = (): Promise<any> => {
    return axios(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        const statusCode = error.response ? error.response.status : null;
        const message = error.message;
        
        if (retryCount >= options.retries! || !options.retryOnStatusCodes!.includes(statusCode!)) {
          return Promise.reject(
            new BadRequestError({
              message,
              url: options.url!.toString(),
              method: options.method!,
              body: error.response && error.response.data,
              statusCode: statusCode!,
              retryCount: retryCount
            })
          );
        } else {
          retryCount++;
          return makeRequest();
        }
      });
  };

  return makeRequest();
};

export interface UtilRequestOptions extends AxiosRequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  retries?: number;
  retryOnStatusCodes?: number[];
}

export default request;
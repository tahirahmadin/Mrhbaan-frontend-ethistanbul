import Axios from 'axios';

const axiosConfig={ headers: { 'Content-Type': 'application/json' } };
class HttpServiceProvider{
	axiosInstance;

	constructor(config){
		Axios.defaults.baseURL=process.env.NEXT_PUBLIC_BASE_URL;
		this.axiosInstance=Axios.create(config);
	}

	async get(url){
		return this.axiosInstance.get(url);
	}

	async post(url,data){
		return this.axiosInstance.post(url,data);
	}
}

const axiosInstance=new HttpServiceProvider(axiosConfig);
export {axiosInstance};

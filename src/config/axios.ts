import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: process.env.BASE_URL,
    baseURL: 'http://localhost:3000/',  });
    
  axiosInstance.interceptors.request.use( (config)=> {
    let userToken:any= localStorage.getItem("userToken");
     userToken = JSON.parse(userToken);
      config.headers.Authorization=`Bearer ${userToken.access_token}`
      return config;
    },(error)=>{
      // Do something with request error
      return Promise.reject(error);
    }
  );
  
export default axiosInstance

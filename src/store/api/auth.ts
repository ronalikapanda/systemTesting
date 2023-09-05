import axiosInstance from "../../config/axios"

export const login=(parm:any)=>{
   return axiosInstance.post('customer/login',{email: "", password: "",...parm})
}

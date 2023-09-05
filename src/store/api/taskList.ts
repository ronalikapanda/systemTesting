import axiosInstance from "../../config/axios"


export const  TaskListApi= ()=>{
    return axiosInstance.get('customer/task/list')
}

export const  taskAddApi= (parm:any)=>{
    return axiosInstance.post('customer/task/create',parm)
}

export const  taskDeleteApi= (id:number)=>{
    return axiosInstance.delete('customer/task/delete/'+id)
}

export const taskubdateapi= (id:number,parm:any)=>{
    return axiosInstance.post('/customer/task/update/'+id,parm)
}
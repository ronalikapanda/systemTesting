import { Alert, Button, Card, Container, Form, Modal, Table } from "react-bootstrap";
import { Formik, Form as FForm, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/redux-hook";
import { TaskListApi, taskAddApi, taskDeleteApi,taskubdateapi } from "../store/api/taskList";
function Dashboard() {

    const [modelHandel,setModelHandel]:any=useState({create:false,update:false})
    const [updateForm,setUpdateForm] = useState({id:null, heading: '', description: '' })
    const [taskList,setTaskList] = useState([])

    const profile = useAppSelector((state)=>state.profile.userProfile)

    const createTask = async (value: any) => {
        console.log(value);
        try {
           let createTask:any = await taskAddApi({
                title:value.heading,
                description:value.description,
                status:"insiated"
            })
            let responce=createTask.data
            if (responce.success) {
                getTaskList()
                setModelHandel({...modelHandel,create:false})
                alert('created Success Fully');
            }else{
                alert('created failed try after some time');
            }
            
        } catch (error) {
            
        }
    }

    const deleteTask= async (id:number)=>{
        try {
            let deleteTask:any = await taskDeleteApi(id)
             let responce=deleteTask.data
             if (responce.success) {
                 getTaskList()
                 setModelHandel({...modelHandel,create:false})
                 alert('delete Success Fully');
             }else{
                 alert('delete failed try after some time');
             }
             
         } catch (error) {
             
         }
    }


    const updateShow=(id:number)=>{
        setModelHandel({...modelHandel,update:true})
        let localList =[...taskList];
        let updateData:any =localList.find((task:any)=>task.id==id)
        setUpdateForm({
            id:updateData.id,
            heading: updateData.title,
            description: updateData.description
        })
    }

    const updateTask=async (value:any)=>{
        console.log("Update Task",value);
      
        try {
            let createTask:any = await taskubdateapi(value.id,{
                 title:value.heading,
                 description:value.description,
                 status:"insiated"
             })
             let responce=createTask.data
             if (responce.success) {
                 getTaskList()
                 setModelHandel({...modelHandel,update:false})
                 alert('update Success Fully');
             }else{
                 alert('update failed try after some time');
             }
             
         } catch (error) {
             
         }
    }


    const ubdateTask = async (value: any) => {
        console.log(value);
        /* try {
            let ubdateTask:any = await taskubdateapi(id,value);{(
                title: value.heading,
                description: value.description,
                status:"insiated"
            )}
             let responce=ubdateTask.data
             if (responce.success) {
                 getTaskList()
                 setModelHandel({...modelHandel,ubdate:false})
                 alert('ubdate Success Fully');
             }else{
                 alert('ubdate failed try after some time');
             }
             
         } catch (error) {
             
         } */
     }

    const validateForm = Yup.object().shape({
        heading: Yup.string().required("Enter your topic name"),
        description: Yup.string().required("Enter your descriptions"),
    })


const getTaskList=async ()=>{
    try {
        let tasks=await TaskListApi()
        let responce = tasks.data
        if(responce.success){
            setTaskList(responce.data)
        }else{
            alert("Geting some isssues try after some time");
        }
    } catch (error) {
        
    }
            
}


    useEffect(()=>{
        // console.log("Project start");
        getTaskList()
        
    },[])


    return (<><Container>
        <div className="mt-5">
            <div>
                <h1>Welcome {profile?.first_name}</h1>
            </div>

            <Card className="mt-5">
                <Card.Header>
                    <div className="justify-content-between d-flex" >
                        <h5>My Task</h5>
                        <Button onClick={()=>{
                            setModelHandel({...modelHandel,create:true})
                        }} variant="outline-secondary" > + Add Task </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th style={{width:20}}>#</th>
                                <th>Topic</th>
                                <th>Description</th>
                                <th style={{width:150}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (taskList.length>0)?
                                (taskList.map((task:any)=>(<tr key={task.id} >
                                    <td>{task.id}</td>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>
                                        <div className="btn-group">
                                        <Button variant="danger" onClick={()=>deleteTask(task.id)} >Delete</Button>
                                        <Button variant="warning" onClick={()=>updateShow(task.id)} >Update</Button>
                                        </div>
                                    </td>
                                </tr>))):(<tr>
                                    <td colSpan={4} className="text-center" >No Task</td>
                                </tr>)
                                
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal size="lg" show={modelHandel.create} aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton onHide={()=>setModelHandel({...modelHandel,create:false})} >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik initialValues={{ heading: '', description: '' }} onSubmit={createTask} validationSchema={validateForm}  >
                        <FForm>
                            <Form.Group className="mb-3">
                                <Form.Label>Topic</Form.Label>
                                <Field name="heading" className="form-control" type="text" placeholder="Enter task heading" />
                                <ErrorMessage component="span" className="text-danger" name="heading" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Description</Form.Label>
                                <Field component="textarea" name="description" className="form-control" type="text" placeholder="Enter details on task" />
                                <ErrorMessage component="span" className="text-danger" name="description" />
                            </Form.Group>
                            <div className="d-grid gap-2 mb-3">
                                <Button variant="secondary" type="submit" > Create Task </Button>
                            </div>
                        </FForm>
                    </Formik>
                </Modal.Body>
            </Modal>

            <Modal size="lg" show={modelHandel.update} aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton onHide={()=>setModelHandel({...modelHandel,update:false})} >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik initialValues={updateForm} onSubmit={updateTask} validationSchema={validateForm}  >
                        <FForm>
                            <Form.Group className="mb-3">
                                <Form.Label>Topic</Form.Label>
                                <Field name="heading" className="form-control" type="text" placeholder="Enter task heading" />
                                <ErrorMessage component="span" className="text-danger" name="heading" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Description</Form.Label>
                                <Field component="textarea" name="description" className="form-control" type="text" placeholder="Enter details on task" />
                                <ErrorMessage component="span" className="text-danger" name="description" />
                            </Form.Group>
                            <div className="d-grid gap-2 mb-3">
                                <Button variant="secondary" type="submit" > Update Now </Button>
                            </div>
                        </FForm>
                    </Formik>
                </Modal.Body>
            </Modal>

        </div>
    </Container></>);
}
export default Dashboard;
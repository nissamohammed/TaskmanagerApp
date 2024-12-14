
import { commonApi } from "./commomApi"
import { serverUrl } from "./serverUrl"

//add task : Create a new task
export const addtodolistApi = async(reqbody)=>{
   return await commonApi('POST', `${serverUrl}/api/tasks`,reqbody)
}

//api Get a list of all tasks.
export const gettodolistApi = async()=>{
   return await commonApi('GET',`${serverUrl}/api/tasks`,"")
}

//Update a specific task by ID.
export const editTaskApi = async(taskid,reqBody)=>{   
   return await commonApi('PUT',`${serverUrl}/api/tasks/${taskid}`,reqBody)
}

//Delete a specific task by ID.
export const deleteTaskApi = async(id)=>{
   return await commonApi('DELETE',`${serverUrl}/api/tasks/${id}`,{},"")
}



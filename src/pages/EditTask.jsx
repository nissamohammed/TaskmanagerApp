import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { editTaskApi } from '../services/allApi';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function EditTask({task, refreshTaskList}) {
    const [show, setShow] = useState(false);
    const [listdetails, setlistdetails] = useState({
        id: task?._id,
        title: task?.title,
        description: task?.description,
        completionstatus: task?.completionstatus
    })

    //update task
    const handleupdate = async(e)=>{
        e.preventDefault()
        const {id, title, description, completionstatus } = listdetails
        if (!title || !description || !completionstatus) {
          alert('please fill the form completely')
        } else {
          const reqBody= new FormData()
          reqBody.append("title",title)
          reqBody.append("description",description)
          reqBody.append("completionstatus",completionstatus)
            const result = await editTaskApi(id,reqBody)
                 console.log(result);
                 if(result.status==200){
                  alert('Task updated successfully')
                  refreshTaskList(); 
                  handleClose(); 
                 }else{
                  alert('somthing went wrong')
                 }
          }
        }
      
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);    
      }

  return (
    <>
    <FontAwesomeIcon icon={faEdit} className="text-success me-3 cursor-pointer" onClick={handleShow} />
     {/* Modal */}
     <Modal show={show} onHide={handleClose} size="md" centered>
  <Modal.Header
    closeButton
    style={{
      background: "linear-gradient(to right, #4caf50, #8bc34a)", 
      color: "white",
      borderBottom: "none",
    }}
  >
    <Modal.Title className="fw-bold "><span className='me-2'>Edit Task</span> <FontAwesomeIcon icon={faEdit}/></Modal.Title>
  </Modal.Header>
  <Modal.Body
    style={{
      backgroundColor: "#f9f9f9",
      padding: "20px",
      borderRadius: "0 0 10px 10px",
    }}
  >
    <div className="d-flex flex-column gap-4">
      <input
        type="text"
        value={listdetails?.title}
        placeholder="Enter Task Title"
        className="form-control shadow-sm"
        style={{
          borderRadius: "5px",
          border: "1px solid #dcdcdc",
        }}
        onChange={(e) =>
          setlistdetails({ ...listdetails, title: e.target.value })
        }
      />
      <textarea
        value={listdetails?.description}
        placeholder="Enter Task Description"
        className="form-control shadow-sm"
        rows="4"
        style={{
          borderRadius: "5px",
          border: "1px solid #dcdcdc",
        }}
        onChange={(e) =>
          setlistdetails({ ...listdetails, description: e.target.value })
        }
      ></textarea>
      <select
        value={listdetails?.completionstatus}
        className="form-select shadow-sm"
        style={{
          borderRadius: "5px",
          border: "1px solid #dcdcdc",
        }}
        onChange={(e) =>
          setlistdetails({ ...listdetails, completionstatus: e.target.value })
        }
      >
        <option value="">Select Completion Status</option>
        <option value="Incomplete">Incomplete</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  </Modal.Body>
  <Modal.Footer
    style={{
      backgroundColor: "#f9f9f9",
      borderTop: "none",
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <Button
      variant="light"
      onClick={handleClose}
      style={{
        backgroundColor: "#f5f5f5",
        border: "1px solid #dcdcdc",
        color: "#757575",
        borderRadius: "5px",
        padding: "8px 15px",
      }}
    >
      Close
    </Button>
    <Button
      variant="success"
      onClick={handleupdate}
      style={{
        background: "linear-gradient(to right, #43a047, #66bb6a)",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        padding: "8px 15px",
        fontWeight: "bold",
      }}
    >
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>

    </>
  )
}

export default EditTask
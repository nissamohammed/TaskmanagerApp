import React from 'react'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addtodolistApi, deleteTaskApi, gettodolistApi } from '../services/allApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faTrash, faPlus, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import EditTask from './EditTask';

function Tasklist() {
    const [show, setShow] = useState(false);
    const [gettodolist, setgettodolist] = useState([])
    const [listdetails, setlistdetails] = useState({
      title:"",
      description:"",
      completionstatus:""
    })
  console.log(listdetails);
  const [searchId, setSearchId] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [deleteStatus, setdeleteStatus] = useState(false);

  //Add Task
    const handleadd = async(e)=>{
      e.preventDefault();
      const {title, description,completionstatus} = listdetails
      if(!title || !description || !completionstatus) {
        alert('please fill the form completely')
      }else{
        const result = await addtodolistApi(listdetails)
         console.log(result);
         if(result.status>=200 && result.status<300){
          alert('New Task Added successfully')
          setlistdetails(result.data)
          getdatalist(); // Fetch the updated task list
          handleClose(); // Close the modal
         }else{
          alert('something went wrong')
        }
      }
    }

  //Get Task/ List Task
    const getdatalist =async()=>{
      const result =await gettodolistApi(gettodolist)
      console.log(result);
        setgettodolist(result.data)
        //console.log(result.data);   
    }

 //Delete Task
  const handleDelete =async(id)=>{
    const result = await deleteTaskApi(id)
    console.log(result);
    if(result.status == 200){
      setdeleteStatus(true)
    }
  } 

 //open modal
  const handleShow = () => setShow(true);
 
  //close modal
  const handleClose = () => {
      setShow(false);
      setlistdetails({
        title:"",
      description:"",
      completionstatus:""
    })
    }
  console.log(gettodolist);
  
  
    useEffect(()=>{
      getdatalist()
      setdeleteStatus(false)
    },[deleteStatus])
  

    const filteredList = gettodolist
    .filter((item) =>
      searchId ? item._id && item._id.toString() === searchId : true
    )
    .filter((item) =>
      filterStatus ? item.completionstatus === filterStatus : true
    );

  return (
    <>
  <div
  className="container py-5 mt-5 rounded shadow"
  style={{
    background: "linear-gradient(to bottom,rgb(197, 208, 244), #d9e4ec)",
    color: "#333",
    minHeight: "90vh",
  }}>
  {/* Header */}
  <div className="text-center mb-4">
    <h1 className="fw-bold" style={{ color: "#007bff" }}>
      <FontAwesomeIcon icon={faClipboardList} className="me-3" />
      Task Manager
    </h1>
  </div>

  {/* Add Button */}
  <div className="d-flex justify-content-center mb-4">
  <button
    type="button"
    className="btn shadow-sm d-flex align-items-center gap-2 px-4"
    onClick={handleShow}
    style={{
      background: "linear-gradient(to right, #6a11cb, #2575fc)", // Gradient colors
      color: "#fff",
      border: "none",
      fontWeight: "bold",
    }}
  >
      <FontAwesomeIcon icon={faPlus} /> Add Task
    </button>
  </div>

  {/* Search &Filters */}
  <div className="row mb-5">
    <div className="col-md-6 mb-3">
      <input
        type="text"
        className="form-control shadow-sm"
        placeholder="Search by Task ID e.g., ID: 675d3534245f211f5897126d"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        style={{ borderColor: "#007bff" }} />
    </div>
    <div className="col-md-6">
      <select
        className="form-select shadow-sm"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        style={{ borderColor: "#007bff" }}>
        <option value="">Filter by All Status</option>
        <option value="Incomplete">Incomplete</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  </div>

  {/* Modal */}
  <Modal show={show} onHide={handleClose} size="md" centered>
  {/* Modal Header */}
  <Modal.Header
    closeButton
    style={{
      background: "linear-gradient(to right, #ff7e5f, #feb47b)", 
      color: "white",
      borderBottom: "none",
    }}
  >
    <Modal.Title className="fw-bold">
      Add New Task Here! <FontAwesomeIcon icon={faClipboardList} />
    </Modal.Title>
  </Modal.Header>

  {/* Modal Body */}
  <Modal.Body
    style={{
      backgroundColor: "#fff8f3", 
      padding: "20px",
      borderRadius: "0 0 10px 10px",
    }}
  >
    <div className="d-flex flex-column gap-4">
      {/* Title Input */}
      <input
        type="text"
        value={listdetails.title}
        placeholder="Enter Task Title"
        className="form-control shadow-sm"
        style={{
          borderRadius: "5px",
          border: "1px solid #f3d9ca",
        }}
        onChange={(e) =>
          setlistdetails({ ...listdetails, title: e.target.value })
        }
      />
      {/* Description Input */}
      <textarea
        value={listdetails.description}
        placeholder="Enter Task Description"
        className="form-control shadow-sm"
        rows="4"
        style={{
          borderRadius: "5px",
          border: "1px solid #f3d9ca",
        }}
        onChange={(e) =>
          setlistdetails({ ...listdetails, description: e.target.value })
        }
      ></textarea>
      {/* Completion Status Dropdown */}
      <select
        value={listdetails.completionstatus}
        className="form-select shadow-sm"
        style={{
          borderRadius: "5px",
          border: "1px solid #f3d9ca",
        }}
        onChange={(e) =>
          setlistdetails({ ...listdetails, completionstatus: e.target.value })
        }>
        <option value="">Select Completion Status</option>
        <option value="Incomplete">Incomplete</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  </Modal.Body>

  {/* Modal Footer */}
  <Modal.Footer
    style={{
      backgroundColor: "#fff8f3",
      borderTop: "none",
      display: "flex",
      justifyContent: "space-between",
    }}>
    <Button
      variant="light"
      onClick={handleClose}
      style={{
        backgroundColor: "#ffe3d9",
        border: "1px solid #f3d9ca",
        color: "#ff6f61",
        borderRadius: "5px",
        padding: "8px 15px",
      }}>
      Close
    </Button>
    <Button
      variant="primary"
      onClick={handleadd}
      style={{
        background: "linear-gradient(to right, #ff512f, #f09819)", 
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        padding: "8px 15px",
        fontWeight: "bold",
      }} >
      Add Task
    </Button>
  </Modal.Footer>
</Modal>


  {/* Task Display-List Cards */}
  <div className="row mt-4">
    {filteredList && filteredList?.length > 0 ? (
      filteredList?.map((item, index) => (
        <div className="col-md-4 mb-4" key={index}>
          <div
            className="card shadow-sm"
            style={{
              background: "#fff",
              borderColor: "#007bff",
              borderRadius: "10px",
            }}>
            <div className="card-body">
              <div className='d-flex' >
                <FontAwesomeIcon icon={faThumbTack} flip="horizontal" style={{color: "#fc31bc",}} className='mt-1 me-2 shadow'/>
              <h5
                className="card-title fw-bold text-capitalize"
                style={{ color: "#007bff" }}>
                {item?.title}
              </h5></div>
              <p className="card-text text-muted">{item?.description}</p>
              <p className="card-text text-muted" style={{fontSize:10}}>ID : {item?._id}</p>
              <div className="d-flex justify-content-between align-items-center">
                <span
                  className={`badge ${
                    item?.completionstatus === "Completed"
                      ? "bg-success"
                      : item?.completionstatus === "In Progress"
                      ? "bg-warning text-dark"
                      : "bg-danger"
                  }`}>
                  {item?.completionstatus}
                  
                </span>
                
                <div className="d-flex align-items-center gap-2">
                  <EditTask task={item} refreshTaskList={getdatalist} />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-danger cursor-pointer"
                    onClick={() => handleDelete(item._id)}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="col-12 text-center text-muted">
        No tasks found. Try a different search.
      </div>
    )}
  </div>
</div>

    </>
  )
}

export default Tasklist
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
import ChatWindow from '../common/ChatWindow';
import Collapse from 'react-bootstrap/Collapse';
import api from '../../api';
import Toast from 'react-bootstrap/Toast';

const Status = () => {
  const [toggle, setToggle] = useState({})

  const [statusCompliants, setStatusCompliants] = useState([]);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [showNoComplaints, setShowNoComplaints] = useState(false);

  // Parse user once
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const _id = user && user._id ? user._id : null;
  const isAdmin = user && user.userType && user.userType.toLowerCase() === 'admin';

  useEffect(() => {
    if (!user || !_id || !token) {
      setNotLoggedIn(true);
      return;
    }
    setNotLoggedIn(false);
    api.get(`/api/complaints`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        let complaintsToShow;
        if (isAdmin) {
          complaintsToShow = res.data;
        } else {
          complaintsToShow = res.data.filter(c => {
            if (!c.userId) return false;
            if (typeof c.userId === 'object' && c.userId._id) {
              if (String(c.userId._id) !== String(_id)) return false;
            } else {
              if (String(c.userId) !== String(_id)) return false;
            }
            // Only show if not assigned or completed
            return c.status !== 'assigned' && c.status !== 'completed';
          });
        }
        setStatusCompliants(complaintsToShow);
        setShowNoComplaints(complaintsToShow.length === 0);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  const handleToggle = (complaintId) => {
    setToggle((prevState) => ({
       ...prevState,
       [complaintId]: !prevState[complaintId],
    }));
 };

  return (
    <>
      <h2 className="text-center mt-4">{isAdmin ? 'All Complaints' : 'Your Complaints'}</h2>
      {notLoggedIn ? (
        <Alert variant="warning" className="text-center">You must be logged in to view your complaints.</Alert>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", margin: "20px" }}>
          {statusCompliants.length > 0 ? (
            statusCompliants.map((complaint, index) => {
              const open = toggle[complaint._id] || false;
              return (
                <Card key={index} style={{ width: '18.5rem', margin: '0 15px 15px 0' }}>
                  <Card.Body>
                    <Card.Title>Name: {complaint.name}</Card.Title>
                    <Card.Text>Address: {complaint.address}</Card.Text>
                    <Card.Text>City: {complaint.city}</Card.Text>
                    <Card.Text>State: {complaint.state}</Card.Text>
                    <Card.Text>Pincode: {complaint.pincode}</Card.Text>
                    <Card.Text>Comment: {complaint.comment}</Card.Text>
                    <Card.Text>Status: {complaint.status}</Card.Text>
                    <Button onClick={() => handleToggle(complaint._id)}
                      aria-controls={`collapse-${complaint._id}`}
                      aria-expanded={open} variant="primary">
                      Message
                    </Button>
                    <div style={{ minHeight: '100%' }}>
                      <Collapse in={open} dimension="width">
                        <div id="example-collapse-text">
                          <Card body style={{ width: '250px', marginTop: '12px' }}>
                            <ChatWindow key={complaint.complaintId} complaintId={complaint._id} name={complaint.name} />
                          </Card>
                        </div>
                      </Collapse>
                    </div>
                  </Card.Body>
                </Card>
              )
            })
          ) : (
            <Alert variant="info">
              <Alert.Heading>No complaints to show</Alert.Heading>
            </Alert>
          )}
        </div>
      )}
      {showNoComplaints && !notLoggedIn && (
        <Toast className="mx-auto mt-3" style={{ maxWidth: 400 }} bg="warning" onClose={() => setShowNoComplaints(false)} show={showNoComplaints} delay={4000} autohide>
          <Toast.Body>No complaints found for your account.</Toast.Body>
        </Toast>
      )}
    </>
  )
}

export default Status;









// import React, { useEffect, useState } from 'react'
// const Status = () => {
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [complaint, setComplaint] = useState("")

//   // useEffect(()=>{
//   //   const id = localStorage.getItem("user")
//   //   console.log(id)

//   //     // axios.get(`http://localhost:8000/status${id}`)
//   //     // .then((res)=>{
//   //     //   const { city, state, complaint } = res.data;
//   //     //   console.log(city,state,complaint)
//   //     //   setState(state);
//   //     //   setCity(city);
//   //     //   setComplaint(complaint)
//   //     // })
//   //     // .catch((err)=>{
//   //     //   console.log(err)
//   //     // })
//   // },[])
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     const { _id } = user;
//     console.log(_id);
//     axios.get(`http://localhost:8000/status/${_id}`)
//       .then((res) => {
//         axios.get('http://localhost:8000/Complaint')
//           .then((res) => {
//             const { city, state, complaint } = res.data;
//             console.log(city, state, complaint)
//             setState(state);
//             setCity(city);
//             setComplaint(complaint)
//           })
//           .catch((err) => {
//             console.log(err)
//           })
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }, []);

//   return (
//     <>
//       <div className="row">
//         <div className="status col-sm-6 mb-sm-0">
//           <div className="card status-card">
//             <div className="card-body">
//               <h5 className="card-title">City:{city}</h5>
//               <p className="card-text">State:{state} </p>
//               <p className="card-text">Complaint:{complaint} </p>

//             </div>
//           </div>
//         </div>
//         <div className="status col-sm-6 mb-sm-0">
//           <div className="card status-card">
//             <div className="card-body">
//               <h5 className="card-title">h</h5>
//               <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />In, voluptatibus!</p>

//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Status
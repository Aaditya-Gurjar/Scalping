// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import {
//   FaUserCircle,
//   FaPhone,
//   FaEnvelope,
//   FaUserTie,
//   FaClipboardList,
//   FaUsers,
//   FaRegStar,
// } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Get_Profile_Data } from "../../CommonAPI/User";

// const ProfilePage = () => {
//   var username = localStorage.getItem("name");
//   const [data, setData] = useState({
//     loading: false,
//     data: [],
//   });
//   // console.log("chaking active plan name", data);

//   const getprofiledata = async () => {
//     const data = {
//       username: username,
//     };
//     await Get_Profile_Data(data).then((response) => {
//       if (response.Status) {
//         // console.log("Get_Profile_Data", response);

//         localStorage.setItem("expire", false);
//         setData({
//           loading: true,
//           data: response?.Data[0],
//         });
//       } else {
//         if (response.message === "Client Expired") {
//           localStorage.setItem("expire", true);
//         }
//         setData({
//           loading: true,
//           data: [],
//         });
//       }
//     });
//   };

//   useEffect(() => {
//     getprofiledata();
//   }, []);

//   return (
//     <div className="profile-page min-vh-100 d-flex align-items-center justify-content-center">
//       <Container fluid>
//         <Row className="justify-content-center">
//           <Col md={10} lg={8} xl={6}>
//             <Card className="glass-card shadow-lg border-0 rounded-4 overflow-hidden">
//               <Card.Body className="p-4">
//                 {/* Animated Background Elements */}
//                 <div className="animated-bg">
//                   <div className="gradient-blob"></div>
//                   <div className="gradient-blob"></div>
//                 </div>
//                 {/* Profile Header */}
//                 <div className="text-center mb-4 position-relative">
//                   <div className="avatar-container">
//                     <FaUserCircle
//                       size={100}
//                       className="text-light profile-avatar"
//                     />
//                     <div className="avatar-glow"></div>
//                   </div>
//                   <h3 className="mt-3 text-gradient">{username}</h3>
//                 </div>




//                 {/* {console.log("data?.data?.BrokerName", data?.data?.Group)} */}
//                 {/* Info Grid */}
//                 <Row className="g-4">
//                   {[
//                     {
//                       icon: <FaPhone />,
//                       text: (data && data?.data?.Mobile_No) || "-",
//                       color: "#4e54c8",
//                     },
//                     {
//                       icon: <FaEnvelope />,
//                       text: (data && data?.data?.EmailId) || "-",
//                       color: "#8f94fb",
//                     },

//                     {
//                       icon: <FaUserTie />,
//                       text: `Broker: ${(data && data?.data?.BrokerName) || " - "}`,
//                       color: "#00b4d8",
//                     },
//                     {
//                       icon: <FaClipboardList />,
//                       text: `Scripts: ${(data && data?.data?.NumberofScript) || "-"}`,
//                       color: "#00f5d4",
//                     },
//                     {
//                       icon: <FaUsers />,
//                       text: (
//                         <>
//                           Group:{" "}
//                           {data?.loading && data?.data?.Group?.length > 0 ? (
//                             <div className="col-8">
//                               {data?.data?.Group.join(" , ")}
//                             </div>
//                           ) : (
//                             <div className="col-8">No Group Available</div>
//                           )}
//                         </>


//                       ),
//                       color: "#9d4edd",
//                     },
//                     {
//                       icon: <FaRegStar />,
//                       text: (
//                         <>
//                         Plan Name: {""}
//                           {data.loading && data && data?.data?.Planname?.length >
//                           0 ? (
//                           <div className="col-8">
//                             {data && data?.data?.Planname.join(" , ")}
//                           </div>
//                           ) : (<div className="col-8">No Plan Available</div>)}
//                         </>
//                       ),

//                       color: "#ff9e00",
//                     },
//                   ].map((item, index) => (
//                     <Col xs={12} md={6} key={index}>
//                       <Card
//                         className="info-card hover-transform"
//                         style={{ "--hover-color": item.color }}>
//                         <Card.Body className="d-flex align-items-center">
//                           <span
//                             className="icon-wrapper me-3"
//                             style={{ color: item.color }}>
//                             {item.icon}
//                           </span>
//                           <span className="text-light">{item.text}</span>
//                         </Card.Body>
//                       </Card>
//                     </Col>
//                   ))}
//                 </Row>
//                 {/* Action Button */}
//                 {/* <div className="text-center mt-4">
//                   <Button
//                     variant="outline-light"
//                     className="glow-button rounded-pill px-4 py-2">
//                     Edit Profile
//                   </Button>
//                 </div> */}
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default ProfilePage;
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Modal } from "react-bootstrap";
import { FaPhone, FaEnvelope, FaUserTie, FaClipboardList, FaUsers, FaRegStar } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Get_Profile_Data } from "../../CommonAPI/User";

// Import images
import one from './profilesImg/one.jpg';
import two from './profilesImg/two.jpg';
import three from './profilesImg/three.jpg';
import four from './profilesImg/four.jpg';
import five from './profilesImg/five.jpg';
import six from './profilesImg/six.jpg';
import seven from './profilesImg/seven.jpg';
import eight from './profilesImg/eigth.jpg';
import nine from './profilesImg/nine.jpg';

const ProfilePage = () => {
  const username = localStorage.getItem("name");
  const [data, setData] = useState({ loading: false, data: [] });
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(localStorage.getItem("userProfileImage") || null);
  const imgArr = [one, two, three, four, five, six, seven, eight, nine];

  // Fetch profile data
  const getProfileData = async () => {
    try {
      const requestData = { username: username };
      const response = await Get_Profile_Data(requestData);
      if (response.Status) {
        localStorage.setItem("expire", "false");
        setData({ loading: true, data: response?.Data[0] });
      } else {
        if (response.message === "Client Expired") {
          localStorage.setItem("expire", "true");
        }
        setData({ loading: true, data: [] });
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  // Handle image selection
  const handleImageSelect = (image) => {
    setSelectedImage(image);
    localStorage.setItem("userProfileImage", image); // Save selected image to localStorage
    setShowModal(false); // Close the modal
  };

  return (
    <div className="profile-page min-vh-100 d-flex align-items-center justify-content-center">
      <Container fluid>
        <Row className="justify-content-center">
          <Col md={10} lg={8} xl={6}>
            <Card className="glass-card shadow-lg border-0 rounded-4 overflow-hidden">
              <Card.Body className="p-4">
                {/* Profile Header */}
                <div className="text-center mb-4 position-relative">
                  {/* <div className="avatar-container" onClick={() => setShowModal(true)}> */}
                  <div className="avatar-container" >

                    <img
                      src={selectedImage || "/assets/images/user/1.jpg"}
                      alt="Profile Avatar"
                      className="profile-avatar"
                      style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                    />
                  </div>
                  <h3 className="mt-3 text-gradient">{username}</h3>
                </div>

                {/* Info Grid */}
                <Row className="g-4">
                  {[{
                    icon: <FaPhone />,
                    text: data?.data?.Mobile_No || "-",
                    color: "#4e54c8",
                  },
                  {
                    icon: <FaEnvelope />,
                    text: data?.data?.EmailId || "-",
                    color: "#8f94fb",
                  },
                  {
                    icon: <FaUserTie />,
                    text: `Broker: ${data?.data?.BrokerName || "-"}`,
                    color: "#00b4d8",
                  },
                  {
                    icon: <FaClipboardList />,
                    text: `Scripts: ${data?.data?.NumberofScript || "-"}`,
                    color: "#00f5d4",
                  },
                  {
                    icon: <FaUsers />,
                    text: data?.data?.Group?.length ? data?.data?.Group.join(", ") : "No Group Available",
                    color: "#9d4edd",
                  },
                  {
                    icon: <FaRegStar />,
                    text: data?.data?.Planname?.length ? data?.data?.Planname.join(", ") : "No Plan Available",
                    color: "#ff9e00",
                  },
                  ].map((item, index) => (
                    <Col xs={12} md={6} key={index}>
                      <Card className="info-card hover-transform" style={{ "--hover-color": item.color }}>
                        <Card.Body className="d-flex align-items-center">
                          <span
                            className="icon-wrapper me-3"
                            style={{ color: item.color }}>
                            {item.icon}
                          </span>
                          <span className="text-light">{item.text}</span>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal for selecting profile image */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-2">
            {imgArr.map((image, index) => (
              <Col xs={4} key={index} className="text-center">
                <img
                  src={image}
                  alt={`avatar-${index}`}
                  className={`img-fluid rounded-circle ${selectedImage === image ? "selected-avatar" : ""}`} // Apply class if selected
                  style={{
                    cursor: "pointer",
                    width: "60px",
                    height: "60px",
                    border: selectedImage === image ? "2px solid #4e54c8" : "none", // Add border for selected image
                  }}
                  onClick={() => handleImageSelect(image)} // Add onClick handler to select image
                />
              </Col>
            ))}
          </Row>

        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProfilePage;

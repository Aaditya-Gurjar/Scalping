import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaPhone,
  FaEnvelope,
  FaUserTie,
  FaClipboardList,
  FaUsers,
  FaRegStar,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Get_Profile_Data } from "../../CommonAPI/User";

const ProfilePage = () => {
  const username = localStorage.getItem("name");

  const [data, setData] = useState({ loading: true, profile: {} });

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const requestData = { username };
        const response = await Get_Profile_Data(requestData);
        console.log("Profile response:", response);

        if (response.Status) {
          localStorage.setItem("expire", "false");
          localStorage.setItem(
            "profileData",
            JSON.stringify(response?.Data[0])
          ); // Cache data
          setData({ loading: false, profile: response?.Data[0] });
        } else {
          if (response.message === "Client Expired") {
            localStorage.setItem("expire", "true");
          }
          setData({ loading: false, profile: {} });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setData({ loading: false, profile: {} });
      }
    };

    getProfileData();
  }, []); // ✅ Runs once on mount

  // ✅ Destructure profile data for cleaner code
  const { Mobile_No, EmailId, BrokerName, NumberofScript, Group, Planname } =
    data.profile;

  return (
    <Container style={{ paddingTop: "5%" }}>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card>
            <Card.Body className="p-4 profile-card">
              {/* Profile Header */}
              <div className="text-center mb-4">
                <div className="avatar-container">
                  <img
                    src={"/assets/images/user/1.jpg"}
                    alt="Profile Avatar"
                    className="profile-avatar"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  />
                </div>
                <h3 className="mt-3 text-gradient">{username}</h3>
              </div>

              {/* Profile Data Grid */}
              <Row className="g-3">
                {[
                  {
                    icon: <FaPhone />,
                    text: Mobile_No || "-",
                    color: "#4e54c8",
                  },
                  {
                    icon: <FaEnvelope />,
                    text: EmailId || "-",
                    color: "#8f94fb",
                  },
                  {
                    icon: <FaUserTie />,
                    text: `Broker: ${BrokerName || "-"}`,
                    color: "#00b4d8",
                  },
                  {
                    icon: <FaClipboardList />,
                    text: `Scripts: ${NumberofScript || "-"}`,
                    color: "#00f5d4",
                  },
                  {
                    icon: <FaUsers />,
                    text: Group?.length
                      ? Group.join(", ")
                      : "No Group Available",
                    color: "#9d4edd",
                  },
                  {
                    icon: <FaRegStar />,
                    text: Array.isArray(Planname) && Planname.length ? (

                      <div title={Planname.join(", ")} style={{ cursor: "pointer" }} >
                        {Planname.slice(0, 2).join(", ") + " ..."}
                       
                      </div>
                    )
                      : (
                        "No Plan Available"
                      ),
                    color: "#ff9e00",
                  },
                ].map((item, index) => (
                  <Col xs={12} sm={6} key={index}>
                    <Card
                      className="info-card hover-transform"
                      style={{ "--hover-color": item.color }}>
                      <Card.Body className="d-flex align-items-center">
                        <span
                          className="icon-wrapper me-3 "
                          style={{ color: item.color }}>
                          {item.icon}
                        </span>
                        <span className="user-profile-span">{item.text}</span>
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
  );
};

export default ProfilePage;

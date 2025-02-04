


import React from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const userProfile = {
  username: "Komal",
  mobile: "1232143213",
  email: "komalmalvi@gmail.com",
  brokerName: "ALICEBLUE",
  numberOfScripts: 29,
  group: "New, GP 1, Shubh",
  planName:
    "One Week Demo, New, New Plan, Three Days Live, Chart, New Plan 23, Chartt",
};

const ProfileCard = () => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
      <Card
        className="profile-card text-center shadow-lg p-4 rounded border-0"
        style={{
          maxWidth: "450px",
          width: "100%",
          backgroundColor: "#2c2f36",
          borderColor: "#444",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}>
        <div className="profile-header d-flex justify-content-center mb-4">
          <img
            src="https://randomuser.me/api/portraits/women/79.jpg"
            alt="Profile"
            className="rounded-circle border border-4 border-light shadow-lg"
            style={{
              width: "130px",
              height: "130px",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
          />
        </div>
        <Card.Body>
          <h3 className="text-light mb-3 fw-bold">{userProfile.username}</h3>
          <ListGroup variant="flush" className="bg-transparent text-start">
            <ListGroup.Item className="bg-transparent text-light border-0 py-2">
              <strong>📱</strong> Mobile No: {userProfile.mobile}
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent text-light border-0 py-2">
              <strong>✉️</strong> Email Id: {userProfile.email}
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent text-light border-0 py-2">
              <strong>🏢</strong> Broker Name: {userProfile.brokerName}
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent text-light border-0 py-2">
              <strong>📊</strong> Number of Scripts:{" "}
              {userProfile.numberOfScripts}
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent text-light border-0 py-2">
              <strong>📝</strong> Group: {userProfile.group}
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent text-light border-0 py-2">
              <strong>🎯</strong> Plan Name: {userProfile.planName}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfileCard;

import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  password: string;
}

export const Register: React.FC = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    teamId: 0,
  });
  
  const navigate = useNavigate();

  const storeValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewUser((newUser) => ({ ...newUser, [name]: value }));
    console.log(newUser);
  };

  const register = async () => {
    const response = await axios
      .post("http://localhost:4444/users ", newUser)
      .then(() => alert("User has been registered"))
      .catch((error) => alert("User could not be registered  " + error));
    navigate("/teams");
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <h3>Register</h3>
      <div>
        <Form.Control
          type="text"
          placeholder="Username"
          className="m-2"
          name="username"
          onChange={storeValues}
        />
        <Form.Control
          type="password"
          placeholder="Password"
          className="m-2"
          name="password"
          onChange={storeValues}
        />
        <Form.Control
          type="number"
          placeholder="Team ID"
          name="teamId"
          className="m-2"
          onChange={storeValues}
        />
      </div>
      <div>
        <Button className="m-2" onClick={() => navigate("/")}>
          Back
        </Button>
        <Button className="m-2" onClick={register}>
          Register
        </Button>
      </div>
    </Container>
  );
};

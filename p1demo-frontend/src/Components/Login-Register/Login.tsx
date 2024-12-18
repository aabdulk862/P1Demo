import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const storeValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setLoginCredentials((loginCredentials) => ({
      ...loginCredentials,
      [name]: value,
    }));
    console.log(loginCredentials);
  };

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4444/auth",
        loginCredentials,
        { withCredentials: true }
      );
      if (response.data.role === "player") {
        navigate("/teams");
      } else {
        navigate("/users");
      }
    } catch (error) {
      console.error(error);
      alert("User could not be logged in");
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <h3>Login</h3>
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
      </div>
      <div>
        <Button className="m-2" onClick={login}>
          Login
        </Button>
        <Button
          className="m-2"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </Button>
      </div>
    </Container>
  );
};

import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { store } from "../../GlobalData/store";

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
    //TODO: make sure the username and password are present before proceeding
    //use the username/password from the state object
    const response = await axios
      .post("http://localhost:4444/auth", loginCredentials, {
        withCredentials: true,
      }) //withCredentials lets us interact with sessions on the BackEnd
      .then((response) => {
        console.log(response);

        //TODO: save this data globally
        store.loggedInUser = response.data;
        alert("Welcome " + response.data.username);
        //players will get sent to the teams component, managers get sent to users
        if (response.data.role === "player") {
          navigate("/teams");
        } else {
          navigate("/users");
        }
      })
      .catch((error) => {
        console.log(error);
        //if login fails, basic bad-manners alert to tell them they goofed
        alert(error.response.data);
        //You could also just write a custom message
      });
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

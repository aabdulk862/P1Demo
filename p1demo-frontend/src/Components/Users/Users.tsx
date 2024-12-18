import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";

interface User {
  userId: number;
  username: string;
  role: string;
  team: any;
}

export const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const response = await axios
      .get("http://localhost:4444/users", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      });
  };

  const deleteUser = async (userId: number) => {
    alert("User" + userId + " has been Deleted");
  };

  return (
    <Container>
      <h3>Users</h3>
      <Table className="table-primary table-hover">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Team Name</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.team.teamName}</td>
              <td>
                {user.role === "player" ? (
                  <Button>Premote</Button>
                ) : (
                  <Button className="btn-danger">Demote</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

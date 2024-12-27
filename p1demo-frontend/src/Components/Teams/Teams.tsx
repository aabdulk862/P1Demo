import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { store } from "../../GlobalData/store";

interface Team {
  teamId: number;
  teamName: string;
  teamLocation: string;
}

export const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    getAllTeams();
  }, []);

  const navigate = useNavigate();

  const getAllTeams = async () => {
    const response = await axios.get("http://localhost:4444/teams", {
      withCredentials: true,
    });
    setTeams(response.data);
  };

  const deleteTeam = async (teamId: number) => {
    alert("Team" + teamId + " has been Deleted");
  };

  return (
    <>
      <Container>
        <Button className="btn-info" onClick={() => navigate("/")}>
          Back
        </Button>
        <br />
        <h2>Welcome to the Team Management System  {store.loggedInUser.username}</h2>
        <h3>Sports Teams</h3>
        <Table>
          <thead>
            <tr>
              <th>Team ID</th>
              <th>Team Name</th>
              <th>Team Location</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => {
              return (
                <tr>
                  <td>{team.teamId}</td>
                  <td>{team.teamName}</td>
                  <td>{team.teamLocation}</td>
                  <td>
                    <Button
                      className="btn-danger"
                      onClick={() => deleteTeam(team.teamId)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

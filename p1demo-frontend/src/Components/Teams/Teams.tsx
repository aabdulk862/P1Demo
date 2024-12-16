import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";

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

  const getAllTeams = async () => {
    const response = await axios.get("http://localhost:4444/teams");
    setTeams(response.data);
  };

  return (
    <>
      <Container>
        <h3>Teams</h3>
        <Table>
          <thead>
            <tr>
              <th>Team ID</th>
              <th>Team Name</th>
              <th>Team Location</th>
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
                    <Button className="btn-danger" >Delete</Button>
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

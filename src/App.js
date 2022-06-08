import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input } from "semantic-ui-react";
import "./App.css"


export default function Posts() {
  const [APIData, setAPIData] = useState([]);
  const [Results, setResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((response) => {
      setAPIData(response.data);
    });
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const Data = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setResults(Data);
    } else {
      setResults(APIData);
    }
  };

  return (
    <div style={{ textAlign: "center", padding:"50px 0" }}>
      <Input
        placeholder="Type here to search"
        onChange={(e) => searchItems(e.target.value)}
      />
      <Card.Group>
        {searchInput.length > 1
          ? Results.map((item) => {
              return (
                <Card className="pgraph">
                  <Card.Content>
                  <h3>
                    <Card.Header>{item.name}</Card.Header>
                    <Card.Description>{item.username}</Card.Description>
                    <Card.Description>{item.email}</Card.Description>
                  </h3>
                  </Card.Content>
                </Card>
              );
            })
          : APIData.map((item) => {
              return (
                <Card className="pgraph">
                  <Card.Content>
                  <h3>
                    <Card.Header>{item.name}</Card.Header>
                    <Card.Description>{item.username}</Card.Description>
                    <Card.Description>{item.email}</Card.Description>
                  </h3>
                  </Card.Content>
                </Card>
              );
            })}
      </Card.Group>
    </div>
  );
}

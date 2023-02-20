import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [users, SetUsers] = useState([]);

  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:4000/users").then((result) => {
      console.log(result.data);
      SetUsers(result.data);
    });
  }, []);

  const registerUser = (event) => {
    // event.preventDefault();
    Axios.post("http://localhost:4000/register", { name, email, password }).then((response) => {
      alert("User registered");
      SetUsers([...users, { name, email, password }]);
    });
  };

  return (
    <div className="App">
      <div>
        <form onSubmit={registerUser}>
          <input type="text" placeholder="name" value={name} onChange={(e) => SetName(e.target.value)} />
          <input type="email" placeholder="email" value={email} onChange={(e) => SetEmail(e.target.value)} />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
          />
          <input type="submit" name="register" value="register" />
        </form>
      </div>
      <div>
        {users.map((user, index) => (
          <h2 key={index}>{user.name}</h2>
        ))}
      </div>
    </div>
  );
}

export default App;

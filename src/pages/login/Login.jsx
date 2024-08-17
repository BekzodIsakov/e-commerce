import { useState } from "react";

import style from "./Login.module.scss";
import { useDispatch } from "react-redux";
import { addUser, setUserError } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      if (!response.ok) {
        throw new Error("User login failed!");
      }
      const userData = await response.json();
      dispatch(addUser(userData));
      navigate("/");
    } catch (error) {
      dispatch(setUserError(error.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={style.login}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className={style["form-control"]}>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            placeholder='username'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className={style["form-control"]}>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button disabled={!(userName && password) || loading}>
          {loading ? "In process..." : "Login"}
        </button>
      </form>
    </div>
  );
}

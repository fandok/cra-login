import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onInputChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
  };

  const storeToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://bootcamp-rent-cars.herokuapp.com/customer/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const user = await response.json();
        storeToLocalStorage(user);
      } else {
        MySwal.fire({
          title: <p>Wrong password or email</p>,
          icon: "error",
          showCloseButton: true,
        });
        throw new Error(response.statusText);
      }

      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={onInputChange} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={onInputChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { AppDispatch, RootState } from "../app/store";
import { AuthType } from "../type";
import { Spinner } from "../components/Spinner";

export const Login = () => {
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = FormData;

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector<RootState, AuthType>((state) => state.auth);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...FormData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData))
      .unwrap()
      .then((user) => {
        // NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
        // getting a good response from our API or catch the AsyncThunkAction
        // rejection to show an error message
        toast.success(`Logged in as ${user.name}`);
        navigate("/");
      })
      .catch(toast.error);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login to get support</p>
      </section>

      <section className="form">
        {/* FIXME: There are not labels */}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

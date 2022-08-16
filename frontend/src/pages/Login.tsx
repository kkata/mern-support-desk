import { useState } from "react";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { AppDispatch, RootState } from "../app/store";
import { AuthType } from "../type";

export const Login = () => {
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = FormData;

  const dispatch: AppDispatch = useDispatch();

  const { user, isLoading, isSuccess, message } = useSelector<
    RootState,
    AuthType
  >((state) => state.auth);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...FormData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

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

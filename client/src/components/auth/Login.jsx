import React, {useState, useEffect} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/userSlice';

const Login = () => {
  const dispatch = useDispatch();

  const {user, isAuth} = useSelector((state) => state.userState);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {email, password} = formData;

  const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  }

  useEffect(() => {
    console.log('state: ', user);
  }, [user]);

  if (isAuth) {
    return <Navigate to="/dashboard" replace={true} />
  }

  return (
    <section className="container">
      {/* <div className='alert alert-danger'>Invalid credentials</div> */}
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            autoComplete="username"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  )
}

export default Login;
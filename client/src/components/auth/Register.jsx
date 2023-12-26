import React, {useState} from "react";
// eslint-disable-next-line
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/userSlice";

const Register = () => {

  const dispatch = useDispatch();

    // const {user} = useSelector((state) => state.userState);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const {name, email, password, password2} = formData;

  const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log('register');
    try {
      await dispatch(registerUser({formData, navigate})).unwrap();
      navigate('/login', {replace: true});
    } catch (err) {
      console.log('react-err:', err);
    }
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            autoComplete="useremail"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            autoComplete="new-password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            autoComplete="new-password"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  )
}

export default Register
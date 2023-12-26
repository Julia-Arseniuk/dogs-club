import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllUsers } from "../../redux/userSlice";

import src from '../../img/spinner.gif';
// import avatar from '../../img/users-img/';

const Users = () => {
  const dispatch = useDispatch();

  const {users, loading} = useSelector((state) => state.userState);
  console.log('users: ', users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <section className="container">
        <h1 className="large text-primary">Profiles Page</h1>
        <div className="profiles">

          {loading === 'pending' ? (
            <>
              <h1>Wait for loading...</h1>
              <img src={src} alt="" />
            </>) : (
            users.map((user, i) => (
              <div key={i} className="profile bg-light">
                  <img
                    className="round-img"
                    src="https://images.dog.ceo/breeds/otterhound/n02091635_658.jpg"
                    alt=""
                  />
                  <div>
                    <h2>{user.name}</h2>
                    <Link to='/profile' className="btn btn-primary">View Profile</Link>
                  </div>
              </div>
          ))
          )}




      </div>
    </section>
  )
}

export default Users
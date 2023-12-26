import { Link } from 'react-router-dom';
import fox from '../../img/fox-terrier.webp';


const Profiles = () => {

  return (
    <section className="container">
        <h1 className="large text-primary">Profiles Page</h1>
        <div className="profiles">
            <div className="profile bg-light">
              <img
                className="round-img"
                src={fox}
                alt=""
              />
              <div>
                <h2>Bingo</h2>
                <p>Fox terrier</p>
                <p>Dnipro, Ukraine</p>
                <Link to='/profile' className="btn btn-primary">View Profile</Link>
              </div>
            </div>
      </div>
    </section>
  );
};

export default Profiles;

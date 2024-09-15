import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Logo = ({ imageUrl, logoClass }) => {
  return (
    <div className={clsx(logoClass)}>
      <Link to={process.env.PUBLIC_URL + "/"}>
         <h5 className='logo__name'>Doma</h5>
        {/*<img alt="" src={process.env.PUBLIC_URL + imageUrl} />*/}
      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string
};

export default Logo;

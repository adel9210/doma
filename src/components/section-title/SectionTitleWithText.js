import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("welcome-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Who Are We</h5>
          <h1>Welcome To Doma</h1>
          <p>
            Hello and thank you for joining us today. We are delighted to have
            you here at Mob Doma, your ultimate destination for premium Hello
            and thank you for joining us today. We are delighted to have you
            here at Mob Doma, your ultimate destination for premium diffusers.
            Our mission is to enhance your living spaces with products that
            combine elegance and functionality, bringing you a refreshing and
            aromatic experience.
          </p>
          <br />
          <p>
            Today, we'll take you through our diverse range of diffusers, each
            designed to elevate your environment with soothing fragrances and
            stylish designs. Whether you're looking to create a tranquil
            ambiance at home or add a touch of sophistication to your office, we
            have the perfect solution for you.
          </p>
          <br />
          <p>
            We encourage you to ask questions and explore the various options we
            offer. Our team is here to ensure you find exactly what you need and
            provide you with all the information to make the best choice for
            your space.
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default SectionTitleWithText;

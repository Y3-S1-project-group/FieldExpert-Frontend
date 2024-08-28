import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HomeCards = ({ imageSrc, title, description, buttonText, next }) => {
  return (
    <div className="flex flex-row max-w-4xl gap-5 p-5 mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
      <img
        src={imageSrc}
        alt={title}
        className="object-cover w-64 h-64 rounded-lg"
      />
      <div className="flex flex-col justify-between w-1/2">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
        <Link to={next} 
        className="self-start px-4 py-2 mt-4 text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

HomeCards.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  next: PropTypes.string.isRequired,
};

export default HomeCards;

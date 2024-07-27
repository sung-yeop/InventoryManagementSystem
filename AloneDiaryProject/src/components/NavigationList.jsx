import { Link } from "react-router-dom";
import "./NavigationList.scss";

const NavigationList = ({ nav_name, nav_nav }) => {
  return (
    <div>
      <Link to={nav_nav}>{nav_name}</Link>
    </div>
  );
};

export default NavigationList;

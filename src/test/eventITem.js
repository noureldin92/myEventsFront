import { Link } from "react-router-dom";
export default function EventItem(props) {
  return (
    <h1>
      <Link to={`${props.id}`}> {props.title}gdfgd</Link>
    </h1>
  );
}

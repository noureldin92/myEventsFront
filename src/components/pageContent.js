import classes from "./PageContent.module.css";
import { useRouteError } from "react-router-dom";
function PageContent() {
  let error = useRouteError();
  let title = "";
  if (error.status === 500) {
    title = error.data.message;
  }
  if (error.status === 404) {
    title = "Page Not Found";
  }
  console.log(error);
  return (
    <div className={classes.content}>
      Error
      <h1>{title}</h1>
    </div>
  );
}

export default PageContent;

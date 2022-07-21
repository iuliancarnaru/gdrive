import { Link } from "react-router-dom";

export function Test() {
  return (
    <div>
      PROTECTED ROUTE
      <Link to="/dashboard">Go to dashboard</Link>
    </div>
  );
}

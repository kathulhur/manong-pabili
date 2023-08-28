import { Link, routes } from "@redwoodjs/router";

const VENDORS_PER_PAGE = 5;

const Pagination = ({ count }) => {
  const items = []

  for (let i = 0; i < Math.ceil(count / VENDORS_PER_PAGE); i++) {
    items.push(
      <li key={i}>
        <Link to={routes.admin({ page: i + 1 })}>
          {i + 1}
        </Link>
      </li>
    )
  }

  return (
    <>
      <h2>Pagination</h2>
      <ul>{items}</ul>
    </>
  )
}
export default Pagination;

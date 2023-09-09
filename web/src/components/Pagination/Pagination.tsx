import { Link, routes } from "@redwoodjs/router";

const VENDORS_PER_PAGE = 5;

export interface PaginationProps {
  count: number;
  paginate: (page: number) => string;
}

const Pagination = ({ count, paginate }) => {
  const items = []

  for (let i = 0; i < Math.ceil(count / VENDORS_PER_PAGE); i++) {
    items.push(
      <li key={i}>
        <Link to={paginate(i+1)}>
          {i + 1}
        </Link>
      </li>
    )
  }

  return (
    <>
      <ul className="flex space-x-4">
        <li>Page</li>
        {items}
      </ul>
    </>
  )
}
export default Pagination;

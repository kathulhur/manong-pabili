import type { FindImageById } from "types/graphql";

import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

import Image from "src/components/Admin/Image/Image";
import { Link, routes } from "@redwoodjs/router";

export const QUERY = gql`
  query FindImageById($id: Int!) {
    image: image(id: $id) {
      id
      title
      url
      userId
      createdAt
      updatedAt
      deletedAt
      deleted

    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Image not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);


export const Success = ({ image }: CellSuccessProps<FindImageById>) => {
  return (
    <>
      <div className="p-2">
        <div className="font-semibold space-x-2">
            <Link to={routes.adminUsers()} className="hover:underline hover:underline-offset-1">
            Users
            </Link>
            <span>&gt;</span>
            <Link to={routes.adminUser({ id: image.userId })} className="hover:underline hover:underline-offset-1">
            { image.userId }
            </Link>
            <span>&gt;</span>
            <Link to={routes.userProducts({ id: image.userId })} className="hover:underline hover:underline-offset-1">
              Images
            </Link>
            <span>&gt;</span>
            <Link to={routes.adminImage({ id: image.userId })} className="hover:underline hover:underline-offset-1">
              { image.title }
            </Link>
        </div>
      </div>
      <Image image={image} />
    </>
  );
};

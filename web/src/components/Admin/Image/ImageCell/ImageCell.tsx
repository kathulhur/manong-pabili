import type { FindImageById } from "types/graphql";

import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";
import LoadingComponent from "src/components/Loading/Loading";
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

export const Loading = () => null;

export const Empty = () => <div>Image not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);


export const Success = ({ image }: CellSuccessProps<FindImageById>) => {
  return (
    <div className="m-8">
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
            <Link to={routes.userImages({ id: image.userId })} className="hover:underline hover:underline-offset-1">
              Images
            </Link>
            <span>&gt;</span>
            <Link to={routes.adminImage({ id: image.userId })} className="hover:underline hover:underline-offset-1">
              { image.title }
            </Link>
        </div>
      </div>
      <div className="mt-8">
        <Image image={image} />
      </div>
    </div>
  );
};

import type { EditImageById, UpdateImageInput } from "types/graphql";

import { Link, navigate, routes } from "@redwoodjs/router";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";
import LoadingComponent from "src/components/Loading/Loading";
import ImageForm from "src/components/Admin/Image/ImageForm";

export const QUERY = gql`
  query EditImageById($id: Int!) {
    image: image(id: $id) {
      id
      title
      url
      userId
    }
  }
`;
const UPDATE_IMAGE_MUTATION = gql`
  mutation UpdateImageMutation($id: Int!, $input: UpdateImageInput!) {
    updateImage(id: $id, input: $input) {
      id
      title
      url
      userId
    }
  }
`;

export const Loading = () => null;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ image }: CellSuccessProps<EditImageById>) => {
  const [updateImage, { loading, error }] = useMutation(UPDATE_IMAGE_MUTATION, {
    onCompleted: () => {
      toast.success("Image updated");
      navigate(routes.adminImages());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (
    input: UpdateImageInput,
    id: EditImageById["image"]["id"]
  ) => {
    updateImage({ variables: { id, input } });
  };

  return (
    <>
    <div className="m-2">
      <div className="font-semibold space-x-2">
        <Link to={routes.adminUsers()} className="hover:underline hover:underline-offset-1">
          Users
        </Link>
        <span>&gt;</span>
        <Link to={routes.adminUser({ id: image.userId })} className="hover:underline hover:underline-offset-1">
          { image.userId }
        </Link>
        <span>&gt;</span>
        <Link to={routes.adminImages()} className="hover:underline hover:underline-offset-1">
          Images
        </Link>
        <span>&gt;</span>
        <Link to={routes.adminImage({ id: image.id })} className="hover:underline hover:underline-offset-1">
          { image.title }
        </Link>
        <span>&gt;</span>
        <Link to={routes.adminEditImage({ id: image.id })} className="hover:underline hover:underline-offset-1">
          Edit
        </Link>
      </div>
    </div>
    <div className="">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Image {image?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ImageForm
          image={image}
          onSave={onSave}
          error={error}
          loading={loading}
          />
      </div>
    </div>
    </>
  );
};

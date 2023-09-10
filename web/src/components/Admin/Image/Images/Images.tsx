import { Link, routes } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import { QUERY } from "src/components/Admin/Image/ImagesCell";
import { truncate } from "src/lib/formatters";
import { DELETE_IMAGE_MUTATION } from "src/components/Admin/Image/Image"
import type { DeleteImageMutationVariables, FindImages } from "types/graphql";


const ImagesList = ({ images }: {
  images: FindImages['imagePage']['images'],
}) => {
  const [deleteImage] = useMutation(DELETE_IMAGE_MUTATION, {
    onCompleted: () => {
      toast.success("Image deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    update: (cache, { data: {softDeleteImage}}) => {
      const deletedImageId = softDeleteImage?.id;
      if (deletedImageId) {
        cache.modify({
          fields: {
            imagePage: (existingImagePage: FindImages['imagePage'], { readField }): FindImages['imagePage'] => {
              return {
                ...existingImagePage,
                images: existingImagePage.images.filter(
                  (image) => deletedImageId !== readField("id", image),
                ),
                count: existingImagePage.count - 1,
              };
            },
          },
        });
      }
    }
  });

  const onDeleteClick = (id: DeleteImageMutationVariables["id"]) => {
    if (confirm("Are you sure you want to delete image " + id + "?")) {
      deleteImage({ variables: { id } });
    }
  };

  return (
    <div className="rw-table-wrapper-responsive">
      <table className="rw-table whitespace-nowrap">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Url</th>
            <th>Image</th>
            <th>User id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <tr key={image.id}>
              <td>{truncate(image.id)}</td>
              <td>{truncate(image.title)}</td>
              <td>{truncate(image.url)}</td>
              <td>
                <a href={image.url} target="_blank">
                  <img src={truncate(image.url)} className="w-48"/>
                </a>
              </td>
              <td>
                <Link to={routes.adminUser({ id: image.userId })}>
                  {truncate(image.userId)}
                </Link>
              </td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminImage({ id: image.id })}
                    title={"Show image " + image.id + " detail"}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditImage({ id: image.id })}
                    title={"Edit image " + image.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={"Delete image " + image.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(image.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImagesList;

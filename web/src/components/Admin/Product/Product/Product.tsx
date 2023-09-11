import { Link, routes, navigate } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import { checkboxInputTag, timeTag } from "src/lib/formatters";

import type {
  DeleteProductMutationVariables,
  FindProductById,
} from "types/graphql";

export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProductMutation($id: Int!) {
    softDeleteProduct(id: $id) {
      id
    }
  }
`;

interface Props {
  product: NonNullable<FindProductById["product"]>;
}

const Product = ({ product }: Props) => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
    onCompleted: () => {
      toast.success("Product deleted");
      navigate(routes.adminProducts());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteProductMutationVariables["id"]) => {
    if (confirm("Are you sure you want to delete product " + id + "?")) {
      deleteProduct({ variables: { id } });
    }
  };

  return (
    <>
      <div className="">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Product {product.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{product.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{product.name}</td>
            </tr>
            <tr>
              <th>Availability</th>
              <td>{checkboxInputTag(product.availability)}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{product.userId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(product.createdAt) }</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(product.updatedAt)}</td>
            </tr>
            <tr>
              <th>Deleted at</th>
              <td>{timeTag(product.deletedAt)}</td>
            </tr>
            <tr>
              <th>Deleted</th>
              <td>{checkboxInputTag(product.deleted)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditProduct({ id: product.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(product.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default Product;
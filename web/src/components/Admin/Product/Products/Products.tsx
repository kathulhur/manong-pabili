import { Link, routes } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import { QUERY } from "src/components/Admin/Product/ProductsCell";
import { checkboxInputTag, truncate } from "src/lib/formatters";

import type {
  DeleteProductMutationVariables,
  FindProducts,
} from "types/graphql";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProductMutation($id: Int!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

const ProductsList = ({ products }: { products: FindProducts['productPage']['products'] })  => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
    onCompleted: () => {
      toast.success("Product deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    // refetchQueries: [{ query: QUERY, variables: queryVariables }],
    // awaitRefetchQueries: true,
    update: (cache, { data: deleteProduct }) => {
      const deletedProductId = deleteProduct?.deleteProduct?.id;
      if (deletedProductId) {
        cache.modify({
          fields: {
            productPage: (existingProductPage: FindProducts['productPage'], { readField }): FindProducts['productPage'] => {
              return {
                ...existingProductPage,
                products: existingProductPage.products.filter(
                  (product) => deletedProductId !== readField("id", product),
                ),
                count: existingProductPage.count - 1,
              };
            },
          },
        });
      }
    }
  });

  const onDeleteClick = (id: DeleteProductMutationVariables["id"]) => {
    if (confirm("Are you sure you want to delete product " + id + "?")) {
      deleteProduct({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Availability</th>
            <th>User id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{truncate(product.id)}</td>
              <td>{truncate(product.name)}</td>
              <td>{checkboxInputTag(product.availability)}</td>
              <td>
                <Link to={routes.adminUser({ id: product.userId })}>
                  {truncate(product.userId)}
                </Link>
              </td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminProduct({ id: product.id })}
                    title={"Show product " + product.id + " detail"}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditProduct({ id: product.id })}
                    title={"Edit product " + product.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={"Delete product " + product.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(product.id)}
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

export default ProductsList;

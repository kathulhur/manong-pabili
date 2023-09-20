import { Link, routes } from '@redwoodjs/router'
import { checkboxInputTag, truncate } from 'src/lib/formatters'
import { Product } from 'types/graphql'

export interface TableProps {
    products: Pick<Product, 'id' | 'name' | 'availability' | 'userId'>[]
    onDelete: (id: number) => void
}

const Table = ({ products, onDelete }: TableProps) => {
    return (
        <div className="rw-table-wrapper-responsive">
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
                                <Link
                                    to={routes.adminUser({
                                        id: product.userId,
                                    })}
                                >
                                    {truncate(product.userId)}
                                </Link>
                            </td>
                            <td>
                                <nav className="rw-table-actions">
                                    <Link
                                        to={routes.adminProduct({
                                            id: product.id,
                                        })}
                                        title={
                                            'Show product ' +
                                            product.id +
                                            ' detail'
                                        }
                                        className="rw-button rw-button-small"
                                    >
                                        Show
                                    </Link>
                                    <Link
                                        to={routes.adminEditProduct({
                                            id: product.id,
                                        })}
                                        title={'Edit product ' + product.id}
                                        className="rw-button rw-button-small rw-button-blue"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        type="button"
                                        title={'Delete product ' + product.id}
                                        className="rw-button rw-button-small rw-button-red"
                                        onClick={() => onDelete(product.id)}
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
    )
}

export default Table

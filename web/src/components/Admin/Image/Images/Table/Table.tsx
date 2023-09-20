import { Link, routes } from '@redwoodjs/router'
import { truncate } from 'src/lib/formatters'
import { Image } from 'types/graphql'

export interface TableProps {
    images: Pick<Image, 'id' | 'title' | 'url' | 'userId'>[]
    onDelete: (id: number) => void
}

const Table = ({ images, onDelete }: TableProps) => {
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
                                    <img
                                        src={truncate(image.url)}
                                        className="w-48"
                                    />
                                </a>
                            </td>
                            <td>
                                <Link
                                    to={routes.adminUser({ id: image.userId })}
                                >
                                    {truncate(image.userId)}
                                </Link>
                            </td>
                            <td>
                                <nav className="rw-table-actions">
                                    <Link
                                        to={routes.adminImage({ id: image.id })}
                                        title={
                                            'Show image ' + image.id + ' detail'
                                        }
                                        className="rw-button rw-button-small"
                                    >
                                        Show
                                    </Link>
                                    <Link
                                        to={routes.adminEditImage({
                                            id: image.id,
                                        })}
                                        title={'Edit image ' + image.id}
                                        className="rw-button rw-button-small rw-button-blue"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        type="button"
                                        title={'Delete image ' + image.id}
                                        className="rw-button rw-button-small rw-button-red"
                                        onClick={() => onDelete(image.id)}
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

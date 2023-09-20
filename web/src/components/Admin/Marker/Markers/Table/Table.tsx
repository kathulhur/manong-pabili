import { Link, routes } from '@redwoodjs/router'
import { checkboxInputTag, formatDatetime, truncate } from 'src/lib/formatters'
import { Marker } from 'types/graphql'

export interface TableProps {
    markers: Pick<
        Marker,
        | 'id'
        | 'url'
        | 'userId'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'deleted'
    >[]
    onDelete: (id: number) => void
}

const Table = ({ markers, onDelete }: TableProps) => {
    return (
        <div className="rw-table-wrapper-responsive">
            <table className="rw-table whitespace-nowrap">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Url</th>
                        <th>Marker Image</th>
                        <th>User id</th>
                        <th>Created at</th>
                        <th>Updated at</th>
                        <th>Deleted</th>
                        <th>Deleted at</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {markers.map((marker) => (
                        <tr key={marker.id}>
                            <td>{truncate(marker.id)}</td>
                            <td>{truncate(marker.url)}</td>
                            <td>
                                <img src={marker.url} />
                            </td>
                            <td>{truncate(marker.userId)}</td>
                            <td>{formatDatetime(marker.createdAt)}</td>
                            <td>{formatDatetime(marker.updatedAt)}</td>
                            <td>{checkboxInputTag(marker.deleted)}</td>
                            <td>{formatDatetime(marker.deletedAt)}</td>
                            <td>
                                <nav className="rw-table-actions">
                                    <Link
                                        to={routes.adminMarker({
                                            id: marker.id,
                                        })}
                                        title={
                                            'Show marker ' +
                                            marker.id +
                                            ' detail'
                                        }
                                        className="rw-button rw-button-small"
                                    >
                                        Show
                                    </Link>
                                    <Link
                                        to={routes.adminEditMarker({
                                            id: marker.id,
                                        })}
                                        title={'Edit marker ' + marker.id}
                                        className="rw-button rw-button-small rw-button-blue"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        type="button"
                                        title={'Delete marker ' + marker.id}
                                        className="rw-button rw-button-small rw-button-red"
                                        onClick={() => onDelete(marker.id)}
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

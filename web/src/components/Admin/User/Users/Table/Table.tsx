import { Link, routes } from '@redwoodjs/router'
import Button from 'src/components/Button'
import { checkboxInputTag, formatDatetime, truncate } from 'src/lib/formatters'
import { User as UserType } from 'types/graphql'

export interface TableProps {
    users: Pick<
        UserType,
        | 'verified'
        | 'id'
        | 'email'
        | 'username'
        | 'name'
        | 'gender'
        | 'mobileNumber'
        | 'latitude'
        | 'longitude'
        | 'roles'
        | 'lastLocationUpdate'
        | 'locationHidden'
        | 'locationBroadcastMode'
        | 'markerUrl'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'deleted'
    >[]
    onDelete: (id: number) => void
    onVerify: (id: number) => void
}

const Table = ({ users, onDelete, onVerify }: TableProps) => {
    return (
        <div className="overflow-x-scroll">
            <table className="table-auto whitespace-nowrap">
                <thead className="border">
                    <tr>
                        <th className="px-8 py-4">Verified</th>
                        <th className="px-8 py-4">Id</th>
                        <th className="px-8 py-4">Email</th>
                        <th className="px-8 py-4">Username</th>
                        <th className="px-8 py-4">Name</th>
                        <th className="px-8 py-4">Gender</th>
                        <th className="px-8 py-4">Mobile number</th>
                        <th className="px-8 py-4">Latitude</th>
                        <th className="px-8 py-4">Longitude</th>
                        <th className="px-8 py-4">Roles</th>
                        <th className="px-8 py-4">Last location update</th>
                        <th className="px-8 py-4">Location hidden</th>
                        <th className="px-8 py-4">Location Broadcast Mode</th>
                        <th className="px-8 py-4">Marker url</th>
                        <th className="px-8 py-4">Created at</th>
                        <th className="px-8 py-4">Updated at</th>
                        <th className="px-8 py-4">Deleted at</th>
                        <th className="px-8 py-4">Deleted</th>
                        <th className="px-8 py-4">Links</th>
                        <th className="px-8 py-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border">
                            <td className="px-8 py-4">
                                {checkboxInputTag(user.verified)}
                            </td>
                            <td className="px-8 py-4">{truncate(user.id)}</td>
                            <td className="px-8 py-4">
                                {truncate(user.email)}
                            </td>
                            <td className="px-8 py-4">
                                {truncate(user.username)}
                            </td>
                            <td className="px-8 py-4">{truncate(user.name)}</td>
                            <td className="px-8 py-4">
                                {truncate(user.gender)}
                            </td>
                            <td className="px-8 py-4">
                                {truncate(user.mobileNumber)}
                            </td>
                            <td className="px-8 py-4">
                                {truncate(user.latitude)}
                            </td>
                            <td className="px-8 py-4">
                                {truncate(user.longitude)}
                            </td>
                            <td className="px-8 py-4">
                                {truncate(user.roles)}
                            </td>
                            <td className="px-8 py-4">
                                {formatDatetime(user.lastLocationUpdate)}
                            </td>
                            <td className="px-8 py-4">
                                {checkboxInputTag(user.locationHidden)}
                            </td>
                            <td className="px-8 py-4">
                                {user.locationBroadcastMode}
                            </td>
                            <td className="px-8 py-4">
                                {truncate(user.markerUrl)}
                            </td>
                            <td className="px-8 py-4">
                                {formatDatetime(user.createdAt)}
                            </td>
                            <td className="px-8 py-4">
                                {formatDatetime(user.updatedAt)}
                            </td>
                            <td className="px-8 py-4">
                                {formatDatetime(user.deletedAt)}
                            </td>
                            <td className="px-8 py-4">
                                {checkboxInputTag(user.deleted)}
                            </td>
                            <td className="px-8 py-4">
                                <div className="flex space-x-4">
                                    <Link
                                        to={routes.adminUser({ id: user.id })}
                                        title={
                                            'Show user ' + user.id + ' detail'
                                        }
                                        className=""
                                    >
                                        Show
                                    </Link>
                                    <Link
                                        to={routes.adminEditUser({
                                            id: user.id,
                                        })}
                                        title={'Edit user ' + user.id}
                                        className=""
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        to={routes.adminProducts({
                                            page: 1,
                                            userId: user.id,
                                        })}
                                        title={'Edit user ' + user.id}
                                        className=""
                                    >
                                        view products
                                    </Link>
                                    <Link
                                        to={routes.adminImages({
                                            page: 1,
                                            userId: user.id,
                                        })}
                                        title={'Edit user ' + user.id}
                                        className=""
                                    >
                                        view featured images
                                    </Link>
                                    <Link
                                        to={routes.adminMarkers({
                                            page: 1,
                                            userId: user.id,
                                        })}
                                        title={'Edit user ' + user.id}
                                        className=""
                                    >
                                        view custom markers
                                    </Link>
                                </div>
                            </td>
                            <td className="px-8 flex space-x-4 py-4">
                                <Button
                                    className=""
                                    onClick={() => onVerify(user.id)}
                                >
                                    Verify user
                                </Button>

                                <Button
                                    type="button"
                                    title={'Delete user ' + user.id}
                                    className=""
                                    onClick={() => onDelete(user.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table

import { Link, routes, useParams } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type LayoutProps = {
    title: string
    titleTo: string
    buttonLabel: string
    buttonTo: string
    children: React.ReactNode
}

const ScaffoldLayout = ({
    title,
    titleTo,
    buttonLabel,
    buttonTo,
    children,
}: LayoutProps) => {
    const params = useParams()
    const queryParams = params?.userId ? { userId: params.userId } : {}
    return (
        <div className="rw-scaffold">
            <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
            <header className="rw-header">
                <h1 className="rw-heading rw-heading-primary">
                    <Link to={routes[titleTo]()} className="rw-link">
                        {title}
                    </Link>
                </h1>
                <Link
                    to={routes[buttonTo](queryParams)}
                    className="rw-button rw-button-emerald"
                >
                    <div className="rw-button-icon">+</div> {buttonLabel}
                </Link>
            </header>
            <main className="rw-main">{children}</main>
        </div>
    )
}

export default ScaffoldLayout

import { BounceLoader } from 'react-spinners'

const Loading = () => {
    return (
        <div className="grid place-items-center w-full h-screen -my-5">
            <BounceLoader color="#059669" size={40} />
        </div>
    )
}

export default Loading

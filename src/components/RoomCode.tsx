import { toast } from 'react-toastify';

import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';
import 'react-toastify/dist/ReactToastify.css';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {
    const notify = () => toast("Copiado!");

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code);
        notify();
    }

    return (
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}
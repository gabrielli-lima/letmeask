import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss'
import { database } from '../services/firebase';

export function Home() {
    const navigate = useNavigate();

    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    const [entrarComoAdmin, setEntrarComoAdmin] = useState(false)

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }
        navigate('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }
        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exist');
            return;
        }

        if (roomRef.val().closedAt) {
            alert('Room already closed');
            return;
        }

        if (entrarComoAdmin) {
            navigate(`admin/rooms/${roomCode}`);
        } else {
            navigate(`/rooms/${roomCode}`);
        }
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <h1></h1>
                <div className="main-content">
                    <img src={logoImg} alt="letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="letmeask" />
                        Crie sua sala com o google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                        <Button type="submit" onClick={() => setEntrarComoAdmin(true)}>
                            Entrar na sala como administrador
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
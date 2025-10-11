import landingImg from '../assets/outline_landing.png';
import './InProgress.css';

const InProgress = () => {

    return (
        <div className="centered-rectangle">
            <img
                src={landingImg}
                alt="Landing"
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    display: 'block',
                    margin: 'auto',
                }}
            />
        </div>
    )
}

export default InProgress;

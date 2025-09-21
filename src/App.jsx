import './background.css';
import './Rectangle.css';
import landingImg from './assets/landing.png';

function App() {
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

export default App

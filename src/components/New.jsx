import { useState, useEffect, useRef } from 'react';
import './New.css';
import myPhoto from '../assets/new.png';
import myLogo from '../assets/logo-dark.png';
import oracleLogo from '../assets/oracle-logo-small.png';
import { IconSun, IconBrandGithub, IconCircleChevronLeft, IconBrandLinkedin } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { Tabs } from '@mantine/core';

const New = () => {
    const [greeting, setGreeting] = useState('Hey There!');
    const [animation, setAnimation] = useState('fade-in');
    const [startPageLoadAnimation, setStartPageLoadAnimation] = useState(false);

    const aboutMeRef = useRef(null);
    const workExperienceRef = useRef(null);
    const contactRef = useRef(null);

    const handleScroll = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        setStartPageLoadAnimation(true);

        const greetings = ['Hey There!', 'ನಮಸ್ಕಾರ!'];
        const durations = [5000, 1000]; // 5 seconds for Hello, 2 seconds for ನಮaskara
        let currentGreetingIndex = 0;
        let timeoutId;

        const transitionGreeting = () => {
            setAnimation('fade-out'); // Start fade-out
            setTimeout(() => {
                // After fade-out, change greeting and fade-in
                currentGreetingIndex = (currentGreetingIndex + 1) % greetings.length;
                setGreeting(greetings[currentGreetingIndex]);
                setAnimation('fade-in');

                // Schedule the next transition after the current greeting's display duration
                timeoutId = setTimeout(transitionGreeting, durations[currentGreetingIndex]);
            }, 500); // Duration of fade-out animation
        };

        // Start the first transition after the initial greeting's duration
        // The first greeting is already 'Hello!' and 'fade-in' by default
        timeoutId = setTimeout(transitionGreeting, durations[currentGreetingIndex]);


        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="main-body">
            <div className='main-div'>
                <div className="nav-container">
                    <button
                        onClick={() => {
                            console.log('Logo clicked');
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                        <img src={myLogo} alt="My Logo" className='my-logo' />
                    </button>
                    <nav className="navigation">
                        <button className="nav-button" onClick={() => handleScroll(contactRef)}>Contact Me</button>
                        <button className="nav-button" onClick={() => handleScroll(workExperienceRef)}>Work Experience</button>
                        <button className="nav-button" onClick={() => handleScroll(aboutMeRef)}>About Me</button>
                    </nav>
                    {/* <button>
                        <IconBrandGithub stroke={2} />
                    </button> */}
                </div>
                <div className="child-div">
                    <div className={`image-text-overlay-container ${startPageLoadAnimation ? 'image-slide-in' : ''}`}>
                        <img src={myPhoto} alt="My Photo" className='my-photo' />
                        <div className="overlay-text">
                            <div className={startPageLoadAnimation ? 'line-1-slide-in' : ''}>
                                <span className={animation}>{greeting}</span>
                            </div>
                            <div className={startPageLoadAnimation ? 'line-2-slide-in' : ''}>I'm Manjunath.</div>
                        </div>
                    </div>
                </div>

                {/* Sections */}
                <div ref={aboutMeRef} className="section">
                    <h2>About Me</h2>
                    <p className="about-me-intro">
                        I am a passionate UI developer fluent in Javascript, React and Typescript!
                    </p>
                    <p className="about-me-details">
                        With three years of industry experience in frontend development, I specialize in delivering high-quality user interfaces. My time at Oracle Cerner involved hands-on development using React, focusing on robust and user-centric solutions. I excel at debugging and complex problem-solving
                    </p>
                </div>
                <div ref={workExperienceRef} className="section">
                    <h2>Work Experience</h2>
                    <Tabs defaultValue="mts">
                        <Tabs.List>
                            <Tabs.Tab value="mts">
                                <img src={oracleLogo} alt="Oracle" style={{ height: '20px' }} /> <br />
                                Member of Technical Staff(Current)
                            </Tabs.Tab>
                            <IconCircleChevronLeft stroke={2} />
                            <Tabs.Tab value="se">
                                <img src={oracleLogo} alt="Oracle" style={{ height: '20px' }} /> <br />
                                Software Engineer
                            </Tabs.Tab>
                            <IconCircleChevronLeft stroke={2} />
                            <Tabs.Tab value="intern">
                                <img src={oracleLogo} alt="Oracle" style={{ height: '20px' }} /> <br />
                                Software Development Intern
                            </Tabs.Tab>
                        </Tabs.List>

                        {/* <Tabs.Panel value="mts">
                            Gallery tab content
                        </Tabs.Panel>

                        <Tabs.Panel value="se">
                            Messages tab content
                        </Tabs.Panel>
                        <Tabs.Panel value="intern">
                            I was selected as an intern from campus and did 6 months with Oracle Cerner (then Cerner). <br /> During this time i built an entire <br /> full stack application for storing and displaying media files which would be helpful <br />for knowledge transfer among associates.<br /> The UI was built using React and backend was built using Java and Jersey.
                        </Tabs.Panel> */}
                    </Tabs>
                </div>

                <div ref={contactRef} className="section" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h2>Contact Me</h2>
                    <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Button
                            variant="subtle"
                            onClick={() => window.open('https://www.linkedin.com/in/manjunath-s-60867120b', '_blank')}
                            style={{ padding: '8px' }}
                        >
                            <IconBrandLinkedin size={24} stroke={1.5} />
                        </Button>
                        <span>Connect with me on LinkedIn</span>
                    </div>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <input
                                type="text"
                                placeholder="Your Name"
                                style={{
                                    padding: '12px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <input
                                type="email"
                                placeholder="Your Email"
                                style={{
                                    padding: '12px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                console.log('Form submitted');
                            }}
                            style={{
                                marginTop: '10px',
                                backgroundColor: '#2d2d2d',
                                color: 'white',
                                padding: '12px 24px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                width: 'fit-content'
                            }}
                        >
                            Send Message
                        </Button>
                    </form>
                </div>

                <div className='theme-toggle-container'>
                    <Button variant='transparent'>
                        <IconSun stroke={1} color='white' />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default New;
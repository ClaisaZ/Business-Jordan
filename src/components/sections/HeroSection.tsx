import { Link } from "react-router-dom";

import trainerImage from "../../assets/images/trainer-placeholder.jpg";
import "../../styles/hero.css";

function HeroSection() {
    return (
        <section className="hero">
            <div className="hero__content">
                <p className="hero__eyebrow">Personal Training</p>

                <h1 className="hero__title">
                    Build strength. Move better. Feel stronger.
                </h1>

                <p className="hero__description">
                    Personalized training focused on strength, movement, confidence,
                    and long-term progress.
                </p>

                <div className="hero__actions">
                    <Link to="/contact">Start Training</Link>
                    <Link to="/services">View Services</Link>
                </div>
            </div>

            <div className="hero__visual">
                <div className="hero__image-wrapper">
                    <div className="hero__image-background" />

                    <img
                        src={trainerImage}
                        alt="Personal trainer"
                        className="hero__image"
                    />

                    <div className="hero__hotspots">
                        {/* Future interactive body-part hotspots */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
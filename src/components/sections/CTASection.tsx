import { Link } from "react-router-dom";
import "../../styles/cta.css";

function CTASection() {
    return (
        <section className="cta">
            <div className="cta__content">
                <p className="cta__eyebrow">Ready to Start?</p>

                <h2 className="cta__title">
                    Your strongest
                    <br />
                    version starts here.
                </h2>

                <p className="cta__description">
                    Let’s build a training plan around your goals,
                    experience, and lifestyle.
                </p>
            </div>

            <div className="cta__action">
                <p className="cta__action-label">
                    Ready when you are.
                </p>

                <Link to="/contact" className="cta__button">
                    Start Training
                    <span aria-hidden="true">↗</span>
                </Link>

                <div className="cta__visual" aria-hidden="true">
                    <span className="cta__visual-circle" />
                    <span className="cta__visual-arrow">→</span>
                </div>
            </div>
        </section>
    );
}

export default CTASection;
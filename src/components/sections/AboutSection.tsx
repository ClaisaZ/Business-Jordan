import "../../styles/about.css";

function AboutSection() {
  return (
    <section className="about">
      <div className="about__intro">
        <p className="about__eyebrow">Meet Your Trainer</p>

        <h2 className="about__title">
          Training built around you.
        </h2>
      </div>

      <div className="about__content">
        <p className="about__lead">
          Helping clients build strength, improve movement, and create
          sustainable results through personalized training.
        </p>

        <p className="about__description">
          Every client starts from a different place. Training should reflect
          your goals, experience, lifestyle, and the way your body moves.
        </p>
      </div>
    </section>
  );
}

export default AboutSection;
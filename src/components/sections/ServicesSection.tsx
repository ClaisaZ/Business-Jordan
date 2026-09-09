import ServiceCard from "../ui/ServiceCard";
import "../../styles/services-section.css";

function ServicesSection() {
  return (
    <section className="services-section">
      <div className="services-section__header">
        <p className="services-section__eyebrow">Services</p>

        <h2 className="services-section__title">
          Training options built around your goals.
        </h2>
      </div>

      <div className="services-section__grid">
        <ServiceCard
          featured
          title="1-on-1 Personal Training"
          description="Private coaching built around your goals, experience, and progress."
          features={[
            "Personalized workouts",
            "Strength programming",
            "Progress tracking",
          ]}
        />

        <ServiceCard
          title="Small Group Training"
          description="Train with others while still getting structured coaching and guidance."
          features={[
            "Small group sessions",
            "Structured programming",
            "Motivating environment",
          ]}
        />

        <ServiceCard
          title="Online Coaching"
          description="Flexible programming and support for clients training on their own schedule."
          features={[
            "Custom workout plan",
            "Remote check-ins",
            "Progress adjustments",
          ]}
        />
      </div>
    </section>
  );
}

export default ServicesSection;
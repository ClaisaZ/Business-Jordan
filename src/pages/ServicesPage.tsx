import ServiceCard from "../components/ui/ServiceCard";
import "../styles/services-page.css";

function ServicesPage() {
  return (
    <section className="services-page">
      <div className="services-page__header">
        <p className="services-page__eyebrow">Services</p>

        <h1 className="services-page__title">
          Choose the training style that fits you.
        </h1>

        <p className="services-page__description">
          Whether you want private coaching, a motivating group environment,
          or flexible online support, training can be built around your goals.
        </p>
      </div>

      <div className="services-page__grid">
        <ServiceCard
          title="1-on-1 Personal Training"
          description="Private coaching designed around your goals, experience, and progress."
          features={[
            "Personalized workouts",
            "Strength programming",
            "Progress tracking",
          ]}
        />

        <ServiceCard
          title="Small Group Training"
          description="Structured training with a small group while still receiving coaching and guidance."
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

export default ServicesPage;
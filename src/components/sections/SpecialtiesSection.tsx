import SpecialtyCard from "../ui/SpecialtyCard";
import "../../styles/specialties.css";

function SpecialtiesSection() {
  return (
    <section className="specialties">
      <div className="specialties__header">
        <p className="specialties__eyebrow">What I Help With</p>

        <h2 className="specialties__title">
          Training built around real goals.
        </h2>
      </div>

      <div className="specialties__grid">
        <SpecialtyCard
          title="Strength"
          description="Build strength through personalized progressive training."
        />

        <SpecialtyCard
          title="Mobility"
          description="Improve movement quality, control, and confidence."
        />

        <SpecialtyCard
          title="Performance"
          description="Develop athleticism, conditioning, and overall performance."
        />
      </div>
    </section>
  );
}

export default SpecialtiesSection;
type ServiceCardProps = {
  title: string;
  description: string;
  features: string[];
  featured?: boolean;
};

function ServiceCard({
  title,
  description,
  features,
  featured = false,
}: ServiceCardProps) {
  return (
    <article
      className={`service-card ${
        featured ? "service-card--featured" : ""
      }`}
    >
      <div className="service-card__content">
        <h3 className="service-card__title">{title}</h3>

        <p className="service-card__description">
          {description}
        </p>

        <ul className="service-card__features">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>

      <span className="service-card__arrow" aria-hidden="true">
        ↗
      </span>
    </article>
  );
}

export default ServiceCard;
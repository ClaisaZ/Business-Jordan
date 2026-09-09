type SpecialtyCardProps = {
  title: string;
  description: string;
};

function SpecialtyCard({
  title,
  description,
}: SpecialtyCardProps) {
  const visualClass = title.toLowerCase();

  return (
    <article className="specialty-card">
      <div className="specialty-card__content">
        <h3 className="specialty-card__title">{title}</h3>

        <p className="specialty-card__description">
          {description}
        </p>
      </div>

      <div
        className={`specialty-card__visual specialty-card__visual--${visualClass}`}
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
      </div>
    </article>
  );
}

export default SpecialtyCard;
import "../styles/contact-page.css";

function ContactPage() {
  return (
    <section className="contact">
      <div className="contact__intro">
        <p className="contact__eyebrow">Get Started</p>

        <h1 className="contact__title">
          Ready to start training?
        </h1>

        <p className="contact__description">
          Tell me a little about yourself, your goals, and what you're looking
          for. I'll get back to you to discuss the next steps.
        </p>

        <div className="contact__details">
          <div>
            <span>Email</span>
            <p>trainer@example.com</p>
          </div>

          <div>
            <span>Location</span>
            <p>Vancouver, BC</p>
          </div>

          <div>
            <span>Training</span>
            <p>In-person & Online</p>
          </div>
        </div>
      </div>

      <form className="contact__form">
        <div className="contact__field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
          />
        </div>

        <div className="contact__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="contact__field">
          <label htmlFor="goal">Primary Goal</label>

          <select id="goal" name="goal" defaultValue="">
            <option value="" disabled>
              Select a goal
            </option>

            <option value="strength">Build Strength</option>
            <option value="mobility">Improve Mobility</option>
            <option value="performance">Athletic Performance</option>
            <option value="general">General Fitness</option>
          </select>
        </div>

        <div className="contact__field">
          <label htmlFor="message">Tell me about your goals</label>

          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="What would you like to work on?"
          />
        </div>

        <button type="submit" className="contact__submit">
          Send Inquiry
          <span aria-hidden="true">→</span>
        </button>
      </form>
    </section>
  );
}

export default ContactPage;
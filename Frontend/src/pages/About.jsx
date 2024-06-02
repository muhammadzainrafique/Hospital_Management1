export default function About() {
  const content = (
    <div className="about-us-container">
      <section className="about-us">
        <div className="left">
          <img
            src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvc3BpdGFsJTIwaW1nYWdlfGVufDB8fDB8fHww"
            alt="about us img"
          />
        </div>
        <div className="right">
          <h1 className="text-md">About Us</h1>
          <p>
            At <span style={{ fontWeight: "bold" }}>M.Z.R Hospitals</span>, we
            are dedicated to providing exceptional healthcare services with a
            personal touch. Our hospital has been a cornerstone of the community
            since its establishment, and we continue to uphold our commitment to
            excellence, compassion, and innovation in patient care.
          </p>
        </div>
      </section>
      <section className="about-us">
        <div className="left">
          <h1 className="text-md">Our Mission</h1>
          <p>
            Our mission is to deliver comprehensive healthcare services that
            enhance the quality of life for our patients and their families. We
            strive to be a leading healthcare provider, fostering a culture of
            respect, integrity, and excellence.
          </p>
        </div>
        <div className="right">
          <img
            src="https://images.unsplash.com/photo-1513224502586-d1e602410265?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvc3BpdGFsJTIwaW1nYWdlfGVufDB8fDB8fHww"
            alt="about us img"
          />
        </div>
      </section>
      <section className="about-us">
        <div className="left">
          <img
            src="https://plus.unsplash.com/premium_photo-1664476505340-28e2f370c9aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG9zcGl0YWwlMjBpbWdhZ2V8ZW58MHx8MHx8fDA%3D"
            alt="about us img"
          />
        </div>
        <div className="right">
          <h1 className="text-md">Our Vision</h1>
          <p>
            We envision a healthier community where every individual has access
            to top-quality healthcare services. By integrating advanced medical
            technology with compassionate care, we aim to set new standards in
            the healthcare industry.
          </p>
        </div>
      </section>
    </div>
  );
  return content;
}
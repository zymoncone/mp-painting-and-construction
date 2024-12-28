import "./Contact.css";
import { useState } from "react";

const Contact = () => {
  const [result, setResult] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const access_key = process.env.REACT_APP_FORM_ACCESS_KEY;

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    setSubmitted(true);
    const formData = new FormData(event.target);

    formData.append("access_key", access_key);
    formData.append("subject", "New Contact Form Submission (M&P Painting and Remodeling)");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="contact">
      <div className="contact-form-title">Get In Touch</div>
      {!submitted && <div className="contact-form-subtitle">
        Fill out the form below for a
        free estimate and I will get back to you as soon
        as possible.
      </div>}
      {submitted ?
        (<div className="contact-success">
          <div className="result-text">{result}</div>
          <button className="button-28" onClick={() => setSubmitted(false)}>Submit Another</button>
        </div>) :
        (<form className="contact-form" onSubmit={onSubmit}>
          <label htmlFor="name">Name<span className="required-text">(required)</span></label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email<span className="required-text">(required)</span></label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="phone">Phone<span className="required-text">(required)</span></label>
          <input type="tel" id="phone" name="phone" pattern="[0-9\s\-]*" title="Please enter a valid phone number (digits, spaces, and dashes are allowed)." required />

          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message"></textarea>

          <button className="button-28" type="submit">Submit</button>
        </form>)}
    </div>
  );
}

export default Contact;
import React, { useState } from 'react'

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
 
  const content = (
    <div className="contact-us">
      <h1 className='text-center'>Contact Us</h1>
        <p className='text-center'>
          If you have any questions or inquiries, feel free to reach out to us!
        </p>
        <div className="form-container">
        <form action="">
      <div className="form-group">
        <label className="form-label" htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Enter name"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="message">Message</label>
        <textarea
              id="message"
              name="message"
              rows="5"
              className='form-textarea'
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
              placeholder="Your message"
              required
            ></textarea>
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
    </div>
    </div>
  )

  return content;
  
}

import React, { useState } from 'react' 

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';

import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleInputChange = (e) => {
    const { name, value} = e.target;

    setFormData({...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message,
    }

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
  };

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email anjola" />
          <a href="mailto:anjolaadeuyi@gmail.com" className='p-text'>anjolaadeuyi@gmail.com</a>
        </div>
        
        <div className="app__footer-card">
          <img src={images.mobile} alt="anjola mobile number" />
          <a href="tel: +234 (123) 456-789" className='p-text'>+234 (123) 456-789</a>
        </div>
      </div>

      {!isFormSubmitted ? 
        (<div className="app__footer-form app__flex">
          <div className="app__flex">
            <input type="text" className='p-text' placeholder='Enter your name' name='name' value={name} onChange={handleInputChange} />
          </div>
          
          <div className="app__flex">
            <input type="email" className='p-text' placeholder='Enter your email' name='email' value={email} onChange={handleInputChange} />
          </div>

          <div>
            <textarea 
              className='p-text'
              placeholder='Your message'
              value={message}
              name='message'
              onChange={handleInputChange}
            />
          </div>

          <button type='button' className='p-text' onClick={handleSubmit}> { loading ? 'Sending message...' : 'Send Message' } </button>
        </div>) : 
        (<div>
          <h3 className="head-text">Thank you for getting in touch</h3>
        </div>) }

      
    </> 
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg'
)

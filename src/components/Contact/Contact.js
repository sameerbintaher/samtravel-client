import React from "react";
import './Contact.css';

const Contact = () => {
  return (
    <div>
        <h3 className='fw-bold'>Don't be a stranger. Just say Hello</h3>
      <div className="background">
        <div className="container">
          <div className="bg-light rounded-3 p-md-4 shadow">
           
            <div className="screen-body">
              <div className="screen-body-item left">
                <div className="app-title">
                  <span>CONTACT US</span>
                  
                  
                </div>
                <div className="app-contact">CONTACT INFO : +880 1641 406497</div>
              </div>
              <div className="screen-body-item">
                <div className="app-form">
                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      placeholder="NAME"
                    />
                  </div>
                  <div className="app-form-group">
                    <input className="app-form-control" placeholder="EMAIL" />
                  </div>
                  <div className="app-form-group">
                    <input className="app-form-control" placeholder="CONTACT NO" />
                  </div>
                  <div className="app-form-group message">
                    <input className="app-form-control" placeholder="MESSAGE" />
                  </div>
                  <div className="app-form-group buttons">
                    <button className="btn px-3 btn-primary">SEND</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;

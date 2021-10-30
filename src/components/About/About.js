import React from 'react';


const About = () => {
    return (
        <div className='container p-md-5 my-5'>
            <h1 style={{fontFamily:'Poppins', fontWeight:'500'}}>About Us</h1><hr />
            <div className="row">
                <div className="col-md-7">
                    <img className="img-fluid" src="https://preview.colorlib.com/theme/tralive/assets/img/gallery/xabout.png.pagespeed.ic.ZsrvwBYE3S.webp" alt="" />
                </div>
                <div className="col-md-5 my-auto ">
                    <h1 className='my-4' style={{textAlign: 'left', fontFamily:'Poppins', fontWeight:'bold'}}>Get ready for real <br /> time adventure</h1>
                    <p style={{textAlign: 'left'}}>Let’s start your journey with us, your dream will come true. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
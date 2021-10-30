import React from 'react';


const About = () => {
    return (
        <div className='container p-md-5 my-5' style={{fontFamily:'Josefin Sans'}}>
            <h1 style={{fontFamily:'Josefin Sans', fontWeight:'600'}}>About Us</h1><hr />
            <div className="row">
                <div className="col-md-7">
                    <img className="img-fluid" src="https://preview.colorlib.com/theme/tralive/assets/img/gallery/xabout.png.pagespeed.ic.ZsrvwBYE3S.webp" alt="" />
                </div>
                <div className="col-md-5 my-auto ">
                    <h1 className='my-4 text-primary' style={{textAlign: 'left', fontWeight:'700'}}>Get ready for real <br /> time adventure</h1>
                    <p style={{textAlign: 'left'}}>Meets with clients to determine travel needs, budgets and preferences. Sells and coordinates transportation, accommodations, insurance, tours and activities. Advises clients regarding destinations, cultures, customs, weather and activities. Collects payments, books travel arrangements and pays applicable fees.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
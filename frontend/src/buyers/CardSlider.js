import React, { useState } from 'react';
import ReactCardSlider from 'react-card-slider-component';

const CardSlider = () => {
    const slides = [
        {image: require("../images/1.jpg"), title: "Zoe PGs", description: "Shared room for boys"},
        {image: require("../images/lake.jpg"), title: "Lake View Apartment", description: "Beautiful Lake View Apartment"},
        {image: require("../images/2.jpg"), title: "Apartments", description: "Suitable for families and children"},
        {image: require("../images/STUDIO-RSX-6.jpg"), title: "Individual Villa", description: "Individual Villa with all amenities"},
        {image: require("../images/villa.jpg"), title: "Lotus Villa", description: "Best Villa in Town"},
        {image: require("../images/1.jpg"), title: "2BHK", description: "Affordable and spacious with modern amenities"},
        {image: require("../images/main-pg.jpeg"), title: "1BHK", description: "Simple and Affordable 1BHK Home with scenic views"},
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };
    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    return (
        <div className='ml-6 mb-5'>
            <h3 className='mb-4'>Popular Properties</h3>
            <ReactCardSlider 
                slides={slides}
                activeSlide={currentSlide} 
                next={handlePrev} 
                prev={handleNext} 
                disableSwipe
            />
        </div>
    );
};

export default CardSlider;

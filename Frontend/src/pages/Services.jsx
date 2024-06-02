import React from 'react';
const services = [
    {
        category: "Primary Care",
        description: "Comprehensive primary care services for all ages.",
        link: "/services/primary-care"
    },
    {
        category: "Emergency Services",
        description: "24/7 emergency care for critical medical conditions.",
        link: "/services/emergency"
    },
    {
        category: "Surgery",
        description: "Advanced surgical procedures with the latest technology.",
        link: "/services/surgery"
    },
    {
        category: "Pediatrics",
        description: "Specialized healthcare for infants, children, and adolescents.",
        link: "/services/pediatrics"
    }
];

const Services = () => {
    return (
        <div className="services-container">
            <h2 className="text-md text-center">Our Services</h2>
            <div className="services-list">
                {services.map((service, index) => (
                    <div className="service-card" key={index}>
                        <h3 className="service-category">{service.category}</h3>
                        <p className="service-description">{service.description}</p>
                        <a href={service.link} className="service-link">Learn More</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Services;

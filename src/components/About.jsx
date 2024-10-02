/* eslint-disable no-unused-vars */
import React from 'react';

function About() {
    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen flex flex-col justify-between p-8">
            <div className="relative h-[50vh]">
                <img
                    src="https://consumer-app-images.pharmeasy.in/marketing/comp_india_covered.jpg"
                    alt="Pharmacy"
                    className="w-full h-full rounded-lg shadow-lg"
                />
            </div>
            <div className="mt-8 space-y-6 flex-grow">
                <p className="text-lg">
                    Welcome to our online medical store! We are committed to providing you with the best healthcare
                    products, medications, and medical supplies right to your doorstep. Our mission is to make
                    healthcare more accessible and convenient for you.
                </p>
                <p className="text-lg">
                    Our platform ensures that you have access to a wide range of medicines, supplements, and healthcare
                    products from the comfort of your home. With a focus on customer satisfaction, we provide fast and
                    reliable delivery services across the country.
                </p>
                <p className="text-lg">
                    At our core, we believe in quality, trust, and efficiency. Our team is dedicated to bringing you
                    the latest and most effective medical products, ensuring that you receive what you need when you
                    need it.
                </p>
            </div>
            <div className="border-t border-gray-700 pt-6 text-center">
                <p className="text-gray-500">
                    © {new Date().getFullYear()} Online Medical Store. All rights reserved. | Privacy Policy | Terms &
                    Conditions
                </p>
                <p className="text-gray-500 mt-2">
                    The products and information available on this website are for informational purposes only. Please
                    consult your healthcare provider before using any medication or medical product.
                </p>
            </div>
        </div>
    );
}

export default About;

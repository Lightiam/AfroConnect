
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#355E3B] text-white py-4 md:py-6">
      <div className="container mx-auto px-3 md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-3 md:mb-4">
              <img 
                src="/lovable-uploads/e6dee00a-5d92-435b-a385-666bdf0a083b.png" 
                alt="AfroConnect Logo" 
                className="h-8 md:h-10 w-auto bg-white rounded-md p-1"
              />
              <h3 className="text-base md:text-lg font-semibold">AfroConnect</h3>
            </div>
            <p className="text-white/80 mb-3 md:mb-4 text-sm md:text-base">Connecting African food vendors with diaspora customers worldwide.</p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-white/80" aria-label="Facebook">
                <i className="ti ti-brand-facebook" aria-hidden="true" />
              </a>
              <a href="#" className="text-white hover:text-white/80" aria-label="Twitter">
                <i className="ti ti-brand-twitter" aria-hidden="true" />
              </a>
              <a href="#" className="text-white hover:text-white/80" aria-label="Instagram">
                <i className="ti ti-brand-instagram" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Quick Links</h3>
            <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
              <li>
                <a href="#" className="text-white/80 hover:text-white">Home</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white">Marketplace</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white">Vendors</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white">Cultural Hub</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Contact Us</h3>
            <address className="not-italic text-white/80 text-sm md:text-base">
              <p className="mb-2">Email: info@afroconnect.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/20 mt-6 md:mt-8 pt-4 md:pt-6 text-center text-white/80 text-xs md:text-sm">
          <p>
            &copy; {new Date().getFullYear()} AfroConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

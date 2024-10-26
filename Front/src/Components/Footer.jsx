import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#E0F7FA] py-4">
      <div className="container mx-auto text-center">
        <h2 className="text-lg font-semibold mb-2">Connect with Us</h2>
        <div className="flex justify-center gap-6 mb-4">
          <a
            href="https://github.com/Yazhini-Rutharappan" // Replace with your GitHub URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-blue-500 transition duration-200"
          >
            <FaGithub className="text-2xl" />
          </a>
          <a
            href=" https://www.linkedin.com/in/yazhini-r-34139526a " // Replace with your LinkedIn URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-blue-500 transition duration-200"
          >
            <FaLinkedin className="text-2xl" />
          </a>
          
        </div>
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Voguish Trends. All rights reserved.
        </p>
      </div>
    </footer>
  );
}



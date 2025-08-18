import React from 'react';
import { FooterProps, FooterLink, SocialLink } from './index';

const Footer: React.FC<FooterProps> = ({ links, socialLinks, copyright }) => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">VDShop</h3>
            <p className="text-gray-300 mb-4">
              Chúng tôi cung cấp các sản phẩm chất lượng cao với giá cả hợp lý.
              Hãy để chúng tôi phục vụ bạn tốt nhất.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Liên kết nhanh
            </h4>
            <ul className="space-y-2">
              {links.slice(0, 5).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Hỗ trợ
            </h4>
            <ul className="space-y-2">
              {links.slice(5).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { SidebarProps, SidebarItem } from './index';

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, items }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="mt-4">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                {item.href ? (
                  <a
                    href={item.href}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    onClick={onClose}
                  >
                    {item.icon && <span className="mr-3">{item.icon}</span>}
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </a>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors text-left"
                  >
                    {item.icon && <span className="mr-3">{item.icon}</span>}
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                )}

                {/* Nested items */}
                {item.children && item.children.length > 0 && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        {child.href ? (
                          <a
                            href={child.href}
                            className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            onClick={onClose}
                          >
                            {child.icon && <span className="mr-3">{child.icon}</span>}
                            <span className="flex-1">{child.label}</span>
                            {child.badge && (
                              <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                {child.badge}
                              </span>
                            )}
                          </a>
                        ) : (
                          <button
                            onClick={child.onClick}
                            className="w-full flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors text-left"
                          >
                            {child.icon && <span className="mr-3">{child.icon}</span>}
                            <span className="flex-1">{child.label}</span>
                            {child.badge && (
                              <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                {child.badge}
                              </span>
                            )}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  showBreadcrumb?: boolean;
  breadcrumbItems?: Array<{
    label: string;
    href?: string;
  }>;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  subtitle,
  className = '',
  showBreadcrumb = false,
  breadcrumbItems = [],
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        {showBreadcrumb && breadcrumbItems.length > 0 && (
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              {breadcrumbItems.map((item, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <svg
                      className="w-4 h-4 mx-2 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-gray-900 font-medium">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Page Header */}
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600">{subtitle}</p>
            )}
          </div>
        )}

        {/* Page Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageContainer;

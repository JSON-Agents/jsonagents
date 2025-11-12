import React from 'react';
import { ArrowRight } from 'lucide-react';

interface QuickLink {
  title: string;
  href: string;
  description: string;
}

interface QuickLinksProps {
  links: QuickLink[];
}

export default function QuickLinks({ links }: QuickLinksProps) {
  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Related Resources</h2>
        <p className="text-sm text-gray-600">Continue exploring JSON AGENTS</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="group p-6 bg-white border border-gray-200 rounded-lg hover:border-slate-400 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-slate-700 mb-2">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {link.description}
                </p>
              </div>
              <ArrowRight
                className="flex-shrink-0 text-gray-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-200"
                size={20}
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

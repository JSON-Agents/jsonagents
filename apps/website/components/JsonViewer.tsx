"use client";

import { useState } from 'react';

interface JsonViewerProps {
  data: any;
  level?: number;
}

export default function JsonViewer({ data, level = 0 }: JsonViewerProps) {
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});

  const toggleCollapse = (key: string) => {
    setCollapsed(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const indent = level * 20;

  const renderValue = (value: any, key: string, index: number): React.ReactElement => {
    const fullKey = `${level}-${key}-${index}`;

    if (value === null) {
      return <span className="text-purple-600">null</span>;
    }

    if (typeof value === 'boolean') {
      return <span className="text-purple-600">{value.toString()}</span>;
    }

    if (typeof value === 'number') {
      return <span className="text-blue-600">{value}</span>;
    }

    if (typeof value === 'string') {
      return <span className="text-green-700">"{value}"</span>;
    }

    if (Array.isArray(value)) {
      const isCollapsed = collapsed[fullKey];
      const isEmpty = value.length === 0;

      return (
        <div className="inline-block w-full">
          <span
            onClick={() => !isEmpty && toggleCollapse(fullKey)}
            className={!isEmpty ? "cursor-pointer hover:bg-gray-100 rounded px-1" : ""}
          >
            <span className="text-gray-600">[</span>
            {isEmpty ? (
              <span className="text-gray-600">]</span>
            ) : (
              <>
                {isCollapsed ? (
                  <span className="text-gray-500 italic"> ... {value.length} items </span>
                ) : null}
                <span className="text-gray-600">{isCollapsed ? ']' : ''}</span>
              </>
            )}
          </span>
          {!isCollapsed && !isEmpty && (
            <div style={{ marginLeft: '20px' }}>
              {value.map((item, i) => (
                <div key={i} className="leading-relaxed">
                  {renderValue(item, `${key}[${i}]`, i)}
                  {i < value.length - 1 && <span className="text-gray-600">,</span>}
                </div>
              ))}
              <span className="text-gray-600">]</span>
            </div>
          )}
        </div>
      );
    }

    if (typeof value === 'object') {
      const isCollapsed = collapsed[fullKey];
      const keys = Object.keys(value);
      const isEmpty = keys.length === 0;

      return (
        <div className="inline-block w-full">
          <span
            onClick={() => !isEmpty && toggleCollapse(fullKey)}
            className={!isEmpty ? "cursor-pointer hover:bg-gray-100 rounded px-1" : ""}
          >
            <span className="text-gray-600">{'{'}</span>
            {isEmpty ? (
              <span className="text-gray-600">{'}'}</span>
            ) : (
              <>
                {isCollapsed ? (
                  <span className="text-gray-500 italic"> ... {keys.length} properties </span>
                ) : null}
                <span className="text-gray-600">{isCollapsed ? '}' : ''}</span>
              </>
            )}
          </span>
          {!isCollapsed && !isEmpty && (
            <div style={{ marginLeft: '20px' }}>
              {keys.map((k, i) => (
                <div key={k} className="leading-relaxed">
                  <span className="text-red-700">"{k}"</span>
                  <span className="text-gray-600">: </span>
                  {renderValue(value[k], `${key}.${k}`, i)}
                  {i < keys.length - 1 && <span className="text-gray-600">,</span>}
                </div>
              ))}
              <span className="text-gray-600">{'}'}</span>
            </div>
          )}
        </div>
      );
    }

    return <span>{String(value)}</span>;
  };

  return (
    <div className="font-mono text-sm leading-relaxed bg-gray-50 border border-gray-300 rounded-lg p-6 overflow-x-auto">
      {renderValue(data, 'root', 0)}
    </div>
  );
}

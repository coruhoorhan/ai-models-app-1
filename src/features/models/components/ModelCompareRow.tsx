import React from 'react';

interface ModelCompareRowProps {
  label: string;
  valueA: React.ReactNode;
  valueB: React.ReactNode;
  isLast?: boolean;
}

export function ModelCompareRow({ label, valueA, valueB, isLast = false }: ModelCompareRowProps) {
  return (
    <div className={`grid grid-cols-2 divide-x divide-hairline p-md ${!isLast ? 'border-b border-hairline' : ''}`}>
      <div>
        <span className="text-label text-subtle block mb-xs">{label}</span>
        {valueA}
      </div>
      <div className="pl-md">
        <span className="text-label text-subtle block mb-xs">{label}</span>
        {valueB}
      </div>
    </div>
  );
}

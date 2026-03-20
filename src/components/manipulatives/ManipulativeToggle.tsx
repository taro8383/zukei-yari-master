import { useState, ReactNode } from 'react';

interface ManipulativeToggleProps {
  label?: string;
  children: ReactNode;
}

const ManipulativeToggle = ({ label = '図を見る / Show Visual', children }: ManipulativeToggleProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200"
      >
        <span>👁</span>
        <span>{open ? `かくす / Hide Visual` : label}</span>
      </button>
      {open && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default ManipulativeToggle;

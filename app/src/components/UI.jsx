
import React from 'react';
export const Button = ({ children, variant='default', ...rest }) => {
  const cls = ['btn'];
  if (variant==='primary') cls.push('primary');
  if (variant==='danger') cls.push('danger');
  if (variant==='ghost') cls.push('ghost');
  return <button className={cls.join(' ')} {...rest}>{children}</button>;
};
export const Card = ({ children, style }) => <div className="card" style={style}>{children}</div>;
export function Field({ label, children }) {
  return (
    <div className="field" style={{ marginBottom: 12 }}>
      {label && (
        <label style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>
          {label}
        </label>
      )}
      {children}
    </div>
  );
}


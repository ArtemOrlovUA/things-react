import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
function Button({ children, state, to, type = 'primary', onClick, usageAs = 'button' }) {
  const base = `rounded-full text-lg text-stone-800 bg-blue-400 font-semibold uppercase tracking-wide transition-colors hover:bg-blue-600 hover:text-stone-100 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-2 disabled:cursor-not-allowed`;

  const styles = {
    primary: base + ` p-4 `,
    small: base + ` p-2 `,
    close: base + ` p-2 flex items-center justify-center`,
    close_selected: base + ` p-2 flex items-center justify-center bg-blue-600`,
    edit: base + ` p-2 flex items-center justify-center`,
    plus: base + ` p-2 flex items-center justify-center`,
  };

  const icons = {
    close: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
    close_selected: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
    edit: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    ),
    plus: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  };

  const content = icons[type] || children;

  if (to)
    return (
      <Link onClick={onClick} className={`${styles[type]} mt-10`} to={to}>
        {content}
      </Link>
    );

  return (
    <button
      type={usageAs}
      onClick={onClick}
      disabled={state === 'loading' || state === 'submitting'}
      className={styles[type]}>
      {content}
    </button>
  );
}

export default Button;

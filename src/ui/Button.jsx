import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
function Button({
  children,
  state,
  to,
  type = 'primary',
  popovertarget,
  onClick,
  usageAs = 'button',
}) {
  const base = `font-semibold uppercase tracking-wide transition-all duration-200 ease-out 
    focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-70 
    flex items-center justify-center gap-2`;

  const styles = {
    primary:
      base +
      ` px-8 py-4 rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-600 
      hover:from-purple-700 hover:to-pink-700 hover:shadow-lg hover:scale-[1.02] 
      focus:ring-purple-200 focus:ring-offset-2`,

    small:
      base +
      ` px-6 py-2.5 rounded-full text-sm bg-white/30 backdrop-blur-sm border border-white/30 
      text-gray-700 hover:border-purple-300 hover:bg-white/50 hover:shadow-md 
      focus:ring-purple-200 focus:ring-offset-1`,

    small_selected:
      base +
      ` px-6 py-2.5 rounded-full text-sm bg-gradient-to-r from-purple-600/20 to-pink-600/20 
      border border-purple-200 text-purple-700 hover:shadow-md 
      focus:ring-purple-200 focus:ring-offset-1`,

    close:
      base +
      ` p-2 rounded-full bg-white/30 backdrop-blur-sm border border-white/30 
      text-gray-500 hover:text-purple-600 hover:border-purple-300 hover:bg-white/50 
      hover:shadow-md focus:ring-purple-200`,

    close_selected:
      base +
      ` p-2 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 
      border border-purple-200 text-purple-600 hover:shadow-md 
      focus:ring-purple-200`,

    edit:
      base +
      ` p-2 rounded-full bg-white/30 backdrop-blur-sm border border-white/30 
      text-gray-500 hover:text-purple-600 hover:border-purple-300 hover:bg-white/50 
      hover:shadow-md focus:ring-purple-200`,

    plus:
      base +
      ` p-2 rounded-full bg-white/30 backdrop-blur-sm border border-white/30 
      text-gray-500 hover:text-purple-600 hover:border-purple-300 hover:bg-white/50 
      hover:shadow-md focus:ring-purple-200`,
  };

  const icons = {
    close: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    close_selected: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    edit: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.656 2.655L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    ),
    plus: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  };

  const content = icons[type] || children;

  if (to) {
    return (
      <Link onClick={onClick} className={`${styles[type]}`} to={to}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={usageAs}
      onClick={onClick}
      popovertarget={popovertarget}
      disabled={state === 'loading' || state === 'submitting'}
      className={styles[type]}>
      {content}
    </button>
  );
}

export default Button;

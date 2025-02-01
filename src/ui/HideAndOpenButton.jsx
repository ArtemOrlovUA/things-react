/* eslint-disable react/prop-types */
import Button from './Button';

function HideAndOpenButton({ isHidden, setIsHidden }) {
  return (
    <div className="sm:hidden flex float-right my-4">
      <div className="w-full flex justify-end mr-4">
        <Button onClick={() => setIsHidden(!isHidden)} type="small">
          <span className="whitespace-nowrap">{isHidden ? 'Open' : 'Hide'}</span>
          {isHidden ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
          )}
        </Button>
      </div>
    </div>
  );
}

export default HideAndOpenButton;

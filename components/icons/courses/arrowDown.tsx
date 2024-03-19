const ArrowDown = ({ className }: { className: string }) => {
  return (
    <svg
      className={`${className}`}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 6L8 11L3 6"
        stroke="#8C94A3"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ArrowDown;

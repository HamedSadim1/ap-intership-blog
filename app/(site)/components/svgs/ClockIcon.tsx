interface ClockIconProps {
  className?: string;
}

const ClockIcon = ({ className = "w-4 h-4" }: ClockIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6l4 2"
      />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
};

export default ClockIcon;

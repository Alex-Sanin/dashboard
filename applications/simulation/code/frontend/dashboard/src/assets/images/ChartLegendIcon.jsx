const ChartLegendIcon = ({color}) => {
    return (
        <svg
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="8" cy="4" r="3" stroke={color} strokeWidth="2" />
            <line x1="5" y1="4" y2="4" stroke={color} strokeWidth="2" />
            <line x1="16" y1="4" x2="11" y2="4" stroke={color} strokeWidth="2" />
        </svg>
    );
};

export default ChartLegendIcon;

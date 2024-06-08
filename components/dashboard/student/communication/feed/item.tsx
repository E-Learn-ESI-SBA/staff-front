


const Item = (
  { Icon, text, count, className, color, onClick }:
  { Icon: any; text?: string, count?: number, className?: string, color?: string, onClick?: () => void }) => {
    return (
      <div
        className={`flex flex-row gap-2 items-center cursor-pointer font-bold hover:text-blue-500`}
        onClick={() => onClick && onClick()}
        >
        <Icon className={`h-6 w-6 hover:fill-blue-500 ${className}`} color={color || "gray"} /><span className="text-blue-500">{count}</span>
        {text && <p className="text-blue-500 font-bold">{text}</p>}
      </div>
    );
};


export default Item;
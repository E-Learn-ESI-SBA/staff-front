


const Item = ({ Icon, text, count }: { Icon: any; text?: string, count?: number }) => {
    return (
      <div className="flex flex-row gap-2 items-center cursor-pointer font-bold">
        <Icon className="h-8 w-8" color="gray" /><span className="text-gray-500">{count}</span>
        {text && <p className="text-gray-500 font-bold">{text}</p>}
      </div>
    );
};


export default Item;
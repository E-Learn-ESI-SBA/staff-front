import Image from 'next/image';
const Response = () => {

  return (
    <div className='flex flex-col gap-4' >
  <div className='flex flex-col gap-2 items-start ' >
<p className='font-semibold text-lg' >Q1.</p>
<p className='font-medium text-lg' >Which of the following is not a networking protocol ?</p>
<ul className='flex flex-col gap-2 min-w-[250px] w-2/3 lg:w-1/2 ' >
  <li className='rounded-xl p-2 border-2 border-[#DADADA] ' >1. ICP </li>
  <li className='rounded-xl p-2 border-2 border-[#DADADA] ' >2. DCP </li>
  <li className='rounded-xl p-2 border-2 border-[#0CC818] bg-[#EFFFF0] ' >3. CCP </li>
  <li className='rounded-xl p-2 border-2 border-[#DD3A3A] bg-[#FE5C73] ' >4. BCP </li>
</ul>
  </div>
  <div className='flex flex-col gap-2 items-start ' >
<p className='font-semibold text-lg' >Q2.</p>
<p className='font-medium text-lg' >Which of the following is not a networking protocol ?</p>
<ul className='flex flex-col gap-2 min-w-[250px] w-2/3 lg:w-1/2 ' >
  <li className='rounded-xl p-2 border-2 border-[#DADADA] ' >1. ICP </li>
  <li className='rounded-xl p-2 border-2 border-[#DADADA] ' >2. DCP </li>
  <li className='rounded-xl p-2 border-2 border-[#0CC818] bg-[#EFFFF0] ' >3. CCP </li>
  <li className='rounded-xl p-2 border-2 border-[#DADADA] ' >4. ECP </li>
</ul>
  </div>
    </div>

  );
};

export default Response;


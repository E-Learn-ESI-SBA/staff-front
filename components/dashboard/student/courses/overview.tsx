import Image from 'next/image';
import React from 'react';

type Props = {
    description: string;
    points: string[];
};

export default function Overview({ description, points }: Props) {
    const rows = [];
    for (let i = 0; i < points.length; i += 2) {
        const point1 = points[i];
        const point2 = points[i + 1];
        rows.push(
            <div className="flex justify-between mb-4" key={i}>
                <div className="w-1/2 relative">
                        <Image src='/assets/icons/courses/check.svg' width={30} height={30} alt='overview' className='absolute' />
                    <p className='ml-8'>{point1}</p>
                </div>
                {point2 && (
                    <div className="w-1/2 relative">
                            <Image src='/assets/icons/courses/check.svg' width={30} height={30} alt='overview' className='absolute' />
                        <p className='ml-8'>{point2}</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className='w-full flex justify-center'>
            <div className='text-text-GRAY rounded-3xl max-w-[1100px]'>
                <h1 className='text-secondary text-3xl font-medium my-4'>Description</h1>
                <div className='my-8' dangerouslySetInnerHTML={{ __html: description }} />
                <div>
                    <div className='bg-white p-8 rounded-3xl'>
                        <h1 className='text-black text-3xl font-medium mb-8'>What you will learn in this course</h1>
                        <div>{rows}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

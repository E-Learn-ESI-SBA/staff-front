'use client'
import { cn } from '@/@/lib/utils';
import { Button } from '@/components/ui/button';
import React, { ChangeEvent, KeyboardEvent } from 'react';
import { CiSearch } from 'react-icons/ci';

// interface SearchProps {
//     value: string;
//     onChange: (event: ChangeEvent<HTMLInputElement>) => void;
//     onSubmit: () => void;
//     placeholder?: string;
//     className?: string;
//     disabled?: boolean;
// }

const Search: React.FC = () => {
    const [ value, setValue ] = React.useState<string>('');
    const onSubmit = () => {console.log(value)};
    return (
        <div className='flex bg-secondary-background p-2 rounded-full max-w-[340px]'>
            <Button className='bg-transparent border-none'>
            <CiSearch color='gray' className='text-4xl p-2' width={50} />
            </Button>
            <input
                type="text"
                value={value}
                onChange={(e) => {setValue(e.target.value)}}
                onKeyPress={(event: KeyboardEvent<HTMLInputElement>) => {
                    if (event.key === 'Enter') {
                        onSubmit();
                    }
                }}
                placeholder="Search for something"
                className={cn("text-black py-2 w-auto focus:outline-none bg-transparent")}
            />
        </div>
    );
};

export default Search;

'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ArrowDown from '../../../public/courses/arrowDown.svg';
import ArrowUp from '../../../public/courses/arrowUp.svg';
import year from '../../../public/courses/year.svg';
import speciality from '../../../public/courses/speciality.svg';
import { filters} from '@/static/content/coursesFilter';



const Sidebar = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<{ [key: string]: boolean }>(() => {
    const initialFilters: { [key: string]: boolean } = { category: true, years: true };
    Object.keys(filters).forEach(category => {
      initialFilters[`years-${category}`] = true;
      Object.keys(filters[category]).forEach(subcategory => {
        initialFilters[`specialities-${category}-${subcategory}`] = true;
      });
    });
    return initialFilters;
  });

  useEffect(() => {
    console.log('selected', selectedFilters);
  }, [selectedFilters]);

  const toggleFilter = (filterType: string) => {
    setShowFilters((prevShowFilters) => ({
      ...prevShowFilters,
      [filterType]: !prevShowFilters[filterType],
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
    }
  };

  return (
    <div className="py-4 h-fit border font-semibold border-gray-200 bg-white shadow-xl rounded-lg min-w-[250px] max-w-[400px] md:w-1/3 lg:w-1/5">
      <div className="flex items-center justify-between mb-2 px-6">
        <h3 className="font-semibold">Category</h3>
        <button
          onClick={() => toggleFilter("category")}
        >
          {showFilters.category ? <Image src={ArrowUp} alt="Arrow down" width={0} height={0} sizes='100vw' className="w-6 h-6" /> : <Image width={0} height={0} sizes='100vw' src={ArrowDown} alt="Arrow up" className="w-6 h-6" />}
        </button>
      </div>
      <hr className="my-4 " />
      {showFilters.category && (
        <>
          {Object.entries(filters).map(([category, subcategories]) => (
            <div key={category} className="mb-4">
              <div className="flex items-center justify-between mb-2 px-6">
                <div className='flex justify-between items-center gap-2'>
                  <Image width={0} height={0} sizes='100vw' src={year} alt="Arrow down" className="w-6 h-6" />
                  <h3 className="font-semibold">{category}</h3>
                </div>
                <button
                  className="text-white-500 focus:outline-none"
                  onClick={() =>
                    toggleFilter(`years-${category}`)
                  }
                >
                  {showFilters[`years-${category}`] ? <Image width={0} height={0} sizes='100vw' src={ArrowUp} alt="Arrow down" className="w-6 h-6" /> : <Image width={0} height={0} sizes='100vw' src={ArrowDown} alt="Arrow up" className="w-6 h-6" />}
                </button>
              </div>
              <hr className="my-2" />
              {showFilters[`years-${category}`] && (
                <ul className="">
                  {Object.entries(subcategories).map(([subcategory, subsubcategories]) => (
                    <li key={subcategory} className="mb-2">
                      {subcategory && (
                        <div>
                          <div className="flex items-center justify-between mb-2 px-6">
                            <div className='flex justify-between items-center gap-x-2 '>
                              <Image width={0} height={0} sizes='100vw' src={speciality} alt="Arrow down" className="w-6 h-6" />
                              <h4 className="font-semibold">{subcategory}</h4>
                            </div>
                            <button
                              className="text-white-500 focus:outline-none"
                              onClick={() =>
                                toggleFilter(`specialities-${category}-${subcategory}`)
                              }
                            >
                              {showFilters[`specialities-${category}-${subcategory}`] ? <Image width={0} height={0} sizes='100vw' src={ArrowUp} alt="Arrow down" className="w-6 h-6" /> : <Image width={0} height={0} sizes='100vw' src={ArrowDown} alt="Arrow up" className="w-6 h-6" />}
                            </button>
                          </div>
                          <hr className="my-2" />
                        </div>
                      )}

                      {showFilters[`specialities-${category}-${subcategory}`] && (
                        <ul className="">
                          {subsubcategories.map((filter) => (
                            <li key={filter} className='mb-1 px-6'>
                              <label className="flex items-center justify-start gap-2 ">
                                <input
                                  type="checkbox"
                                  value={`${category}-${subcategory}-${filter}`}
                                  onChange={handleCheckboxChange}
                                  checked={selectedFilters.includes(`${category}-${subcategory}-${filter}`)}
                                  className={ selectedFilters.includes(`${category}-${subcategory}-${filter}`) ? 'accent-courses-main' : '' } 
                                />
                                <span className={`text-sm ${selectedFilters.includes(`${category}-${subcategory}-${filter}`) ? 'text-courses-main' : ''}`}>{filter}</span>
                              </label>
                            </li>
                          ))}
                          <hr className="my-2" />
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Sidebar;






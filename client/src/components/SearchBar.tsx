import { useRecoilState, useSetRecoilState } from 'recoil';
import { filterAtoms } from '../atoms/atom';
import { useState } from 'react';
import data from '../data/data.json'
import { UserAPI } from '../api/user.api';


const SearchBar = () => {
    const [filters, setFilters] = useRecoilState(filterAtoms)
    const [filterValues, setFiltervalues] = useState({
        fieldOfInterest: '',
        techStack: '',
        dateOfGrad: '',
        search: ''
    })

    const handleFieldOfInterestSelection = (fieldOfInterest: string) => {
        setFiltervalues(prev => {
            return {
                ...prev,
                fieldOfInterest: fieldOfInterest
            }
        });
    };

    const handleTechStackSelection = (techStack: string) => {
        setFiltervalues(prev => {
            return {
                ...prev,
                techStack: techStack
            }
        });
    };

    const handleDateOfGradSelection = (dateOfGrad: string) => {
        setFiltervalues(prev => {
            return {
                ...prev,
                dateOfGrad: dateOfGrad
            }
        });
    };

    const handleSearch = (search: string) => {
        setFiltervalues(prev => {
            return {
                ...prev,
                search: search
            }
        });
    }

    const handleSearchSubmit = () => {
        setFilters(prev => {
            return {
                ...prev,
                fieldOfInterest: filterValues.fieldOfInterest,
                techStack: filterValues.techStack,
                dateOfGrad: filterValues.dateOfGrad,
                search: filterValues.search,
            }
        })

        UserAPI.getAllUsers(filters)
    }

    return <div className="w-11/12 m-auto mt-5">
        <div className="grid grid-cols-4 items-center gap-8">
            <select
                value={filterValues.fieldOfInterest}
                onChange={(e) => handleFieldOfInterestSelection(e.target.value)}
                className="border-2 border-gray-950 hover:bg-zinc-200 flex-shrink-0 z-10 items-center text-sm font-medium py-2.5 px-4 text-center rounded"
            >
                <option value={''}>Field of Interest</option>
                {data.fieldOfInterestData.map((fielldOfInterest: string, index:number) => (
                    <option key={index} value={fielldOfInterest}>{fielldOfInterest}</option>
                ))}

            </select>

            <select
                value={filterValues.techStack}
                onChange={(e) => handleTechStackSelection(e.target.value)}
                className="my-2 border-2 border-gray-950 hover:bg-zinc-200 flex-shrink-0 z-10 items-center py-2.5 px-4 text-sm font-medium text-center rounded"
            >
                <option value={''}>Tech Stack</option>
                {data.techStackData.map((techStack: string, index:number) => (
                    <option key={index} value={techStack}>{techStack}</option>
                ))}
            </select>

            <div className="flex justify-between border-2 border-gray-950 hover:bg-zinc-200 flex-shrink-0 z-10 items-center text-sm font-medium py-1.5 px-4 text-center rounded">
                <label className='text-blue-700 mr-3 underline'>Sort by Cohort</label>
                <input
                    value={filterValues.dateOfGrad}
                    type="date"
                    className='w-7/12 border-2 border-black bg-transparent px-2'
                    onChange={(e) => handleDateOfGradSelection(e.target.value)}
                />
            </div>

            <div className="relative my-2">
                <input
                    type="search"
                    className="block p-2.5 w-full text-sm rounded border border-gray-300 focus:ring-blue-800 focus:border-blue-800 outline-none"
                    placeholder='Search Users....'
                    required
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <button
                    type="submit"
                    className=" flex gap-2 items-center absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    onClick={handleSearchSubmit}
                >
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <div>Search</div>
                </button>
            </div>
        </div>
    </div>
};

export default SearchBar;
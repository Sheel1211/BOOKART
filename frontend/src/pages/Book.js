import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Books from '../components/Book/Books';

const Book = () => {

  const { firstName, lastName } = useContext(UserContext);
  const [sortType, setSortType] = useState("");

  const handleChange = (event) => {
    setSortType(event.target.value);
  };

  return (
    <>
      {firstName && lastName &&
        <div className='text-center text-2xl'>
          {/* Welcome Jay Patel */}
        </div>
      }
      <div className="flex mx-28 my-5 justify-between items-center">
        <div>
          <h1 className="text-gray-500 text-2xl">Filters</h1>
        </div>
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label"> Sort </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={sortType}
              label="Sort"
              onChange={handleChange}
            >
              <MenuItem value="none">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"a-z"}>A-Z</MenuItem>
              <MenuItem value={"z-a"}>Z-A</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div >
      <Books sortType={sortType} />
    </>
  )
}

export default Book

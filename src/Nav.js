import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DataContext from './DataContext/DataContext';


const Nav = () => {
  const {search,setSearch}=useContext(DataContext)
  return (
   <nav className='Nav'>
    <form className='searchForm' onSubmit={(e) =>e.preventDefault()}>
      <label htmlFor='search'>Search Posts</label>
      <input
        id="search"
        type='text'
        placeholder='Search Posts'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
    <ul>
        <li><Link to="/">HOME</Link></li>
        <li><Link to="post">POST</Link></li>
        <li><Link to="about">ABOUT</Link></li>
    </ul>
   
    </nav>

  )
}

export default Nav
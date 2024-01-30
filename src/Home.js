import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './DataContext/DataContext'

const Home = () => {

    const { searchResults, isLoading, fetchError}=useContext(DataContext)
    console.log(searchResults);
  return (
   <main className='Home'>
      {isLoading && <p className="statusMsg">Loading posts...</p>}
            {!isLoading && fetchError && (
                <p className="statusMsg" style={{ color: 'red' }}>
                    {fetchError}
                </p> 
            )}
            {!isLoading &&
                !fetchError &&
                (searchResults.length ? (
                    <Feed posts={searchResults} />
                ) : (
                    <p className="statusMsg">No posts to display.</p>
                ))}
     </main>
  )
}

export default Home


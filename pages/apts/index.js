import AptCard from '../../components/AptComponents/AptCard'
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { paginate } from "../../lib/paginate";


const Index = ({ apts }) => {
  const [posts, setPosts] = useState([...apts]);

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedPosts = paginate(posts, currentPage, pageSize);


  return (
    <>
      <div className="container mx-auto my-40 w-3/4" >
        <h1 className="text-3xl text-center font-bold mb-5">
          Nekretnine Beograd
        </h1>
        <div className='grid lg:grid-cols-2'>


          {paginatedPosts.map((apt) => (
            <AptCard key={apt._id} apt={apt} />
          ))}

          <Pagination
            items={posts.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

    </>
  )
}

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {

  /* find all the data in our database */
  const url = `${process.env.API_URL}/apts?limit=100`

  /* find all the data in our database */
  const response = await fetch(url);
  const result = await response.json();

  const apts = result.data;


  return { props: { apts: apts } }
}

export default Index

import AptCard from '../../components/AptComponents/AptCard'
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { paginate } from "../../lib/paginate";
import { motion } from 'framer-motion'


const Index = ({ apts }) => {
  const [posts, setPosts] = useState([...apts]);

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedPosts = paginate(posts, currentPage, pageSize);


  return (

      <div className="flex h-screen bg-blue-400">
        <div className="m-auto bg-slate-50 rounded-md w-3/5 min-h-[75%] mt-24 pt-16">
          <h1 className="text-3xl text-center tracking-wider">
            Nekretnine u Beogradu
          </h1>
          <motion.div className='grid lg:grid-cols-2'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>


            {paginatedPosts.map((apt) => (
              <AptCard key={apt._id} apt={apt} />
            ))}

            <Pagination
              items={posts.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </motion.div>


        </div>
      </div>

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

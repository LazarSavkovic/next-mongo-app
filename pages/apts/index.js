import AptCard from '../../components/AptComponents/AptCard'
import { useState } from "react";
import Pagination from "../../components/Pagination";
import { paginate } from "../../lib/paginate";
import { motion } from 'framer-motion'
import { dehydrate, QueryClient, useQuery } from 'react-query';

import { getApts } from '../../lib/ApiCalls';


const Index = () => {

  const { data: apts } = useQuery('apts', getApts)
 
  const [posts, setPosts] = useState([...apts]);

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedPosts = paginate(posts, currentPage, pageSize);


  return (

    <div className="flex bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 mt-24 pt-16">
        <h1 className="text-3xl text-center tracking-wider">
          Nekretnine u Beogradu
        </h1>
        <motion.div className='grid lg:grid-cols-2 m-auto pt-10 justify-center'
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

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('apts', getApts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Index

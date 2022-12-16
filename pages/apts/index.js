import AptCard from '../../components/AptComponents/AptCard'
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { paginate } from "../../lib/paginate";
import { motion } from 'framer-motion'
import { dehydrate, QueryClient, useQuery } from 'react-query';

import { getApts } from '../../lib/ApiCalls';


const Index = () => {

  const { data: apts, isLoading, isError, error } = useQuery('apts', getApts)

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if((!isLoading) && (!isError))
    setPosts(apts)
  }, [posts])

  // const pageSize = 10;
  // const [currentPage, setCurrentPage] = useState(1);

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  // const paginatedPosts = paginate(posts, currentPage, pageSize);

  useEffect(() => {
    console.log('Posts right now are:', posts)
  }, [posts])

  if (isLoading) {
    return <div>Učitava se</div>
  }

  if (isError) {
    return <div>{error}</div>
  }



  return (

    <div className="flex bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 mt-24 pt-16  flex justify-center flex-col">
        <h1 className="text-3xl text-center tracking-wider">
          Nekretnine u Beogradu
        </h1>
        {posts && <>
          <motion.div className='grid lg:grid-cols-2 m-auto pt-10 justify-center'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>


            {posts.map((apt) => (
              <AptCard key={apt._id} apt={apt} />
            ))}

          </motion.div>

          {/* <Pagination
            items={posts.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          /> */}
        </>
          }

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

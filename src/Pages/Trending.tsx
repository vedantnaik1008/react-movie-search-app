import { useState } from 'react'
import {  img_500, unavailable } from '../components/Config';
import Modal from '../components/Modal';
import useTrending from '../hooks/useTrending';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { faPlay, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { ADD, WatchItem } from '../components/WatchSlice';
import { RootState } from '../store';
import { toast } from 'react-toastify';

export interface Fetching{
  results: [];
  name: string;
  title: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  release_date: string;
  media_type: string;
  id: number;
  overview: string;
  vote_average: number;
}


const Trending = () => {
  const [page] = useState(1);
  const [modalData, setModalData] = useState<{ show: boolean; data: Fetching }>({
    show: false,
    data: {} as Fetching,
  });

  const {data: datas, error, isLoading, fetchNextPage, hasNextPage} = useTrending();
  const dispatch = useDispatch()
  const products = useSelector((state: RootState)=> state.watchlater)
  const addToCart = (watchlater: WatchItem) =>{
    const alreadyInWatchList = products.watchlater.some((item)=> item.id === watchlater.id) 
    if(!alreadyInWatchList){
      dispatch(ADD(watchlater))
      toast.success("Added to watch later!");
    }
 }
   if(isLoading)return<div className="d-flex justify-content-center spinner-loader">
   <div className="spinner-border text-primary" role="status">
     <span className="visually-hidden">Loading...</span>
   </div>
 </div> 

 if(error) return <p>{error.message}</p>;

  const fetchedTrendingPages = datas?.pages.reduce((total, page)=> total + page.results.length, 0) || 0;

  const loader = <div className="d-flex justify-content-center">
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>

  return (
    <>
      <div className='bg-black-c'>
        <div className="container">
          <div className="row pt-3 pb-2">
            <div className="col-12 mt-2 mb-4 fs-1 fw-bold text-white text-decoration-underline head d-flex justify-content-center align-items-center h4-title">
              <h4 className="fs-1 text-white fw-800  sub-title">Trending Today</h4>
            </div>
          </div>
        </div>
        <InfiniteScroll next={() => fetchNextPage()} hasMore={!!hasNextPage} loader={loader} dataLength={fetchedTrendingPages} className='display-grid overflow-hidden'>
          {datas.pages.map((page, index)=> (
            <React.Fragment key={index}>
              {page.results.map((val)=> (
                <div key={val.id} id="card" >
                  <div className="cards  rounded-5">
                    <img loading="lazy" src={val.poster_path ? `${img_500 + val.poster_path}` : unavailable}
                    className="card-img-top rounded-5" alt={val.title || val.name}  onClick={() => setModalData({ show: true, data: val })}/>
                    <FontAwesomeIcon icon={faPlay} className='faplay-icon' onClick={() => setModalData({ show: true, data: val })}/>
                    <button className='watch-add' onClick={()=>{
                       addToCart(val)
                    }}><FontAwesomeIcon icon={faStar} size='xl' color='yellow'/></button>
                  </div> 
                </div>
              ))}
            </React.Fragment>
          ))}  
        </InfiniteScroll>
        {modalData.show && (<Modal page={page} show={true} isOpen={modalData.show} setIsOpen={(isOpen) => setModalData({ ...modalData, show: isOpen })} {...modalData.data} key={modalData.data.id}/>)} 
      </div>
    </> 
  )
}

export default Trending

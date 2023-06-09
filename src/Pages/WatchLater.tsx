import { useSelector, useDispatch } from "react-redux"
import { CLEAR, REMOVE,  } from "../components/WatchSlice"
import { RootState } from "../store"
import { faPlay, faXmark, faBroom } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { img_500, unavailable } from "../components/Config"
import { useState } from "react"
import { Fetching } from "./Trending"
import Modal from "../components/Modal"


const WatchLater = () => {
    const [page] = useState(1);
    const [modalData, setModalData] = useState<{ show: boolean; data: Fetching }>({
    show: false,
    data: {} as Fetching,
  });
    const products = useSelector((state: RootState)=> state.watchlater)
    const dispatch = useDispatch()
    const removeToCart = (id:number) =>{
        dispatch(REMOVE(id))
    }

    const clearAll = () =>{
        dispatch(CLEAR())
    }
  return (
    <>
        <div className="watch-padding bg-black-c"> 
            <div className="clear-all" onClick={clearAll}>
                <FontAwesomeIcon icon={faBroom} color="white"/> <span>Clear all</span>
            </div>

            <div className='display-grid-watch-later'>
                {products.watchlater.map((val)=> (
                    <div key={val.id} id="card" >
                    <div className="cards  rounded-5">
                      <img loading="lazy" src={val.poster_path ? `${img_500 + val.poster_path}` : unavailable}
                      className="card-img-top rounded-5" alt={val.title || val.name}  onClick={() => setModalData({ show: true, data: val })}/>
                      <FontAwesomeIcon icon={faPlay} className='faplay-icon' onClick={() => setModalData({ show: true, data: val })}/>
                      <button className=" watch-remove" onClick={()=> removeToCart(val.id)}><FontAwesomeIcon icon={faXmark} size='2xl' color="white"/></button>
                    </div>
                  </div>
                ))}
            </div>
        </div>
        {modalData.show && (<Modal page={page} show={true} isOpen={modalData.show} setIsOpen={(isOpen) => setModalData({ ...modalData, show: isOpen })} {...modalData.data} key={modalData.data.id}/>)} 
    </>
  )
}

export default WatchLater

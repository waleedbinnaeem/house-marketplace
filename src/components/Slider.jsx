import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import Spinner from './Spinner'
import {Swiper, SwiperSlide} from 'swiper/react'
import { EffectCube, Pagination } from 'swiper';
import 'swiper/css';

function Slider() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
      const querySnap = await getDocs(q)

      const listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings(listings)
      setLoading(false)
    }

    fetchListings()
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (listings.length === 0) {
    return <></>
  }

  return (
    listings && (
      <>
        <p className='exploreHeading'>Recommended</p>

        <Swiper
          effect={"cube"}
          modules={[EffectCube, Pagination]}
          pagination={true}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {listings.map(({ data, id, }) =>{
            const bgImage = data.imgUrls[0];
            console.log("backgroundImage", bgImage)

            return(
              <>
              <SwiperSlide
                  key={id}
                  onClick={() => navigate(`/category/${data.type}/${id}`)}>

                        <div className='swiperSlideDiv'
                              style={{
                                backgroundImage:`url(${bgImage})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                              }}>
                            <p className='swiperSlideText'>{data.name}</p>
                            <p className='swiperSlidePrice'>
                              ${data.discountedPrice ?? data.regularPrice}{' '}
                              {data.type === 'rent' && '/ month'}
                            </p>
                        </div>
              </SwiperSlide>
            </>
            )
          })}
          
        </Swiper>
      </>
    )
  )
}

export default Slider
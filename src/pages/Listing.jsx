// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import 'swiper/css/bundle';
import {getDoc, doc} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {db} from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'

import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css';

 
// mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

function Listing() {

    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {

        // if (ref.current && !map) {
        //     const map = new mapboxgl.Map({
        //       container: ref.current,
        //       style: "mapbox://styles/mapbox/streets-v11",
        //       center: [0, 0],
        //       zoom: 1
        //     });
        //     setMap(map);
        // }

        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef)
            console.log(docSnap)

            if(docSnap.exists()) {
                // console.log(docSnap.data())
                setListing(docSnap.data())
                setLoading(false)
            }
        }

        fetchListing()
    }, [navigate, params.listingId])

    if(loading) {
        return <Spinner />
    }

  return <main>
    
    <Swiper 
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
    >
        <SwiperSlide>Slide One</SwiperSlide>
        <SwiperSlide>Slide two</SwiperSlide>
        <SwiperSlide>Slide Three</SwiperSlide>

        {listing.imgUrls.map((url, index) => (
            
          <SwiperSlide key={index}>
            
            <div
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='swiperSlideDiv'
            ></div>
          </SwiperSlide> 
        ))}
    </Swiper>
    <div
        className='shareIconDiv'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setShareLinkCopied(true)
          setTimeout(() => {
            setShareLinkCopied(false)
          }, 2000)
        }}
      >
        <img src={shareIcon} alt="" />
    </div>

    {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

    <div className='listingDetails'>
        <p className="listingName">
            {listing.name} - $
            {listing.offer ? listing.discountPrice : listing.regularPrice}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
            For {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </p>
        {listing.offer && (
            <p className="discountPrice">
                ${listing.regularPrice - listing.discountPrice} 
                discount
            </p>
        )}

        <ul className="listingDetailsList">
            <li>
                {listing.bedrooms > 1
                    ? `${listing.bedrooms} Bedrooms`
                    : '1 Bedroom'}
            </li>
            <li>
                {listing.bathrooms > 1
                    ? `${listing.bathrooms} Bathrooms`
                    : '1 Bathroom'}
            </li>
            <li>{listing.parking && 'Parking Spot'}</li>
            <li>{listing.furnished && 'Furnished'}</li>
        </ul>
        
        <p className="listingLocationTitle">Location</p>

        <div>
            <div className="map-container" />
        </div>

        {auth.currentUser?.uid !== listing.userRef && (
            <Link
                to={`/contact/${listing.userRef}?listingName=${listing.name}`}
                className='primaryButton'
            >
                Contact Lanlord
            </Link>
        )}

    </div>
    </main>
}

export default Listing
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function App() {
  const [img, setImg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [like, setLike] = useState(false)
  const [liking, setliking] = useState(false)
  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true)
      try {
        const res = await (await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}`)).data
        setImg(res)
        setLoading(false)
      } catch (error) {
        console.log(error.response)
        setLoading(false)
      }
    }

    setTimeout(() => {
      fetchImage()
    }, 1000);

  }, [])
  const handleLike = () => {
    setliking(true)
    setLike(!like)
    setTimeout(() => {
      setliking(false)
    }, 500);
  }

  return (
    <div className="p-4 md:p-12">
      <h1><span className='text-green-800 font-bold'>
        Spacestagram:  </span>Image-sharing from the <span className='text-red-800'> final frontier</span></h1>
      <h2 className='mb-8'><span className='text-blue-800 font-medium'>Discover the cosmos!</span> Each day a different image or photograph of our fascinating universe is featured,
        along with a brief explanation written by a professional astronomer.</h2>
      {loading ? <div className='flex items-center justify-center'>
        <AiOutlineLoading3Quarters className='text-gray-600 animate-spin text-7xl' />
      </div> :

        <div className='shadow-lg rounded-3xl mx-auto w-11/12 md:w-1/2'>
          <div className='flex justify-center'>
            <img className='rounded-t-3xl' src={img?.hdurl} alt={img?.title} />
          </div>
          <div className='bg-gray-100 rounded-b-3xl text-gray-800 p-3'>
            <h3 className='text-center text-3xl my-2'>{img?.title}</h3>
            <h4 className=''>{img?.explanation}</h4>
            <div className='flex  items-center justify-between'>
              <div className='flex justify-end p-3'>
                <button onClick={handleLike} className={`text-xl flex items-center justify-between`}>
                  <div className={`heart ${like ? 'liked' : ''} ${liking ? 'liking' : ''}`}>

                  </div>
                  <div className={like ? 'Like' : 'Liked'}>{like ? 'Liked' : 'Like'}</div>
                </button>
              </div>
              <p className='text-xs text-gray-500 my-3'><span>Date</span>: {img?.date}</p>

            </div>

          </div>
        </div>}

    </div>
  );
}

export default App;

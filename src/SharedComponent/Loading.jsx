
import video from '../assets/video/Loading-Blood-Bag.mp4';
import Loader from 'react-js-loader';

const Loading = () => {
  return (
    <div style={loaderStyle} className='min-h-screen w-full flex justify-center items-center'>
      <div className='w-3/12 m-auto'>
        <video style={videoStyle} className='w-full m-auto bg-transparent' autoPlay loop muted>
          <source src={video} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <div className='item -mt-10'>
          <Loader type='bubble-loop' bgColor={'#ea062b'} title={'Loading...'} size={100} />
        </div>
      </div>
    </div>
  );
};

const loaderStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   height: '100vh',
//   width: '100vw',
//   backgroundColor: '#f0f0f0'
};

const videoStyle = {
//   width: '100%',
//   height: 'auto'
};

export default Loading;

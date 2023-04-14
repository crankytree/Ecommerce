import React , {useState , useEffect} from 'react'
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () => {

  const [count , setCount] = useState(5);
 

  const history = useHistory();

  useEffect(() => {
    const interval = setTimeout(() => {
      setCount((prev) => --prev);
    } , 1000)

    if(count === 0){
      history.push("/");
    }

    return () => clearTimeout(interval); 
  } , [count])
  return (
    <div className='container p-5 text-center'>
      <h4 className='text-danger'>ACCESS DENIED !!</h4>
      <p>Redirecting you to Home Page in {count} seconds...</p>
    </div>
  )
}

export default LoadingToRedirect
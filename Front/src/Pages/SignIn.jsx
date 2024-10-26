import { useState } from 'react';
import login from '../image/login.jpg';
import { Alert, Button, Spinner, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields.'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div 
      style={{ 
        backgroundImage: `url(${login})`,
        height: "91.5vh",  
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div 
        style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: "rgba(0, 0, 0, 0.2)"  
        }} 
      />
      
      <div 
        className='relative z-10 border rounded-lg p-8 w-96 flex items-center justify-center flex-col shadow-lg'
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",  
          backdropFilter: "blur(8px)",  
          border: "1px solid rgba(255, 255, 255, 0.2)", 
        }}
      >
        <h2 className='text-white text-2xl mb-6 font-semibold'>Login</h2>
        <div className='w-full'>
          <form onSubmit={handleSubmit}>
            <TextInput 
              type='email' 
              id='email' 
              placeholder='Enter your email'  
              className='w-full text-black' 
              onChange={handleChange}
            />
            <TextInput 
              className="mt-4 w-full text-black"  
              type='password' 
              id='password' 
              placeholder="Enter your password" 
              onChange={handleChange}
            />
            <Button 
              className="mt-5 h-10 w-full text-white font-bold text-3xl rounded-lg text-center bg-pink-500 hover:bg-orange-500 transition duration-200 ease-in-out" 
              type="submit" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                'Log In'
              )}
            </Button>
          </form>
        </div>
        <div className="mt-6 text-center">
          <span className='text-white'>Don't have an account? </span>
          <Link to='/signup' className='hover:underline text-blue-400 font-semibold'>Sign Up</Link>
        </div>
        {errorMessage && (
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}

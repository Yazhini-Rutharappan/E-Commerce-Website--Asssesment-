import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import login from '../image/login.jpg'

export default function SignUp() {
  const [formData, setFormData]=useState({});
  const [errorMessage, setErrorMessage ]=useState(null);
  const [loading, setLoading]=useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData);
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password)
      { 
        return setErrorMessage('Please fill out all feilds.')
      }
      try{
        setLoading(true);
        setErrorMessage(null);
       const res = await fetch('/api/auth/signup', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
       });
       const data = await res.json();
       if(data.success === false)
        {
         return setErrorMessage(data.message);
        }
        setLoading(false);
       if(res.ok)
       {
        navigate('/signin');
       }
      }
      catch(error)
      {
        setErrorMessage(error.message);
        setLoading(false);
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
      }}>
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
        <h2 className='text-white text-2xl mb-6 font-semibold'>Sign Up</h2>
        <div className='w-full'>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2 text-start'>
              <Label value='UserName' className='text-lg mt-1'/>
            <TextInput 
              className=" w-full text-black h-3"  
              type='text' 
              id='username' 
              placeholder="Enter your Name"
              onChange={handleChange}
            />
            </div>
            <div className='flex flex-col gap-2 text-start'>
            <Label value='Email' className='text-lg mt-11'/>
            <TextInput 
              type='email' 
              id='email' 
              placeholder='Enter your email'  
              className=' w-full text-black h-3'
              onChange={handleChange}
            />
            </div>
            <div className='flex flex-col gap-2 text-start'>
            <Label value='Password' className='text-lg mt-11'/>
            <TextInput 
              className="w-full text-black h-3"  
              type='password' 
              id='password' 
              placeholder="Enter your password"
              onChange={handleChange}
            />
            </div>
            <Button className="mt-12 h-10 w-full text-white font-bold text-3xl rounded-lg text-center " gradientDuoTone='pinkToOrange' type='submit'disabled={loading}>
              {
                loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>loading...</span>
                  </>
                ) : ('Sign Up') 
              }
            </Button>
          </form>
        </div>
        <div className="mt-6 text-center">
          <span className='text-white'>Already have an Account? </span>
          <Link to='/signin' className='hover:underline text-blue-400 font-semibold'>Login</Link>
        </div>
        {
            errorMessage &&(
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
      </div>
    </div>
  )
}

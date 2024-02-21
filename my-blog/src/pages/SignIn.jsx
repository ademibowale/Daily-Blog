import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import OAuth from '../components/OAuth';

export default function SignIn() {
const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-20'>
        {/* left side */}
        <div className='flex-1'>
          <Link to="/" className='font-bold dark:text-white text-2xl'>
            <span className='px-1 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white '>DiwuraEssential's</span>
            Blog
          </Link>
          <p className='px-1 py-5 text-sn-5'>
            Hey there! Welcome to DiwuraEssential, join the community– 
            The social blog where real people talk about real life(and have a blast doing it!) ✨
            and everything in between!
            Join the fun! DiwuraEssential: Where good vibes and great conversations flow.
          </p>
        </div>
         
        {/* right side */}
        <div className=' flex-1'>
          <h2 className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white '>
            Signin with your email and password or with Google</h2>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
            
            <div>
              <Label value='email'/>
              <TextInput type='email' 
                placeholder='Enter your email'
                id='email'
                onChange={handleChange}
                 />
            </div>
            <div>
              <Label value='password'/>
              <TextInput  type='password' 
                placeholder='**********'
                id='password'
                onChange={handleChange}/>
            </div>
            <Button  gradientDuoTone='purpleToPink'
             type='submit' disabled={loading}>
               {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
        </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Dont have an account Signup?</span>
            <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
          </div>
          {/* Error alert message */}
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
            )
          }
        </div>
      </div> 
    </div>
  );
}

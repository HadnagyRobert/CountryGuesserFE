import React from 'react';

const SignupForm = ({ onSignup, isLogin, email, setEmail, firstName, setFirstName, lastName, setLastName }) => (
  <form 
    onSubmit={onSignup} 
    className={`w-full transition-all duration-1000 ease-in-out overflow-hidden ${isLogin ? 'h-0 invisible' : 'h-auto visible'}`}
  >
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="email">Email</label>
      <input 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        name="email" 
      />
      <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="firstName">First Name</label>
      <input 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="text" 
        placeholder="First Name" 
        value={firstName} 
        onChange={e => setFirstName(e.target.value)}  
        name="firstName" 
      />
      <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="lastName">Last Name</label>
      <input 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="text" 
        placeholder="Last Name" 
        value={lastName} 
        onChange={e => setLastName(e.target.value)}  
        name="lastName" 
      />
    </div>
    <div className="flex items-center justify-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Sign Up
      </button>
    </div>
  </form>
);

export default SignupForm;

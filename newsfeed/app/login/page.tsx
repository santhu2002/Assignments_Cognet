'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push('/dashboard');
  };
   useEffect(() => {
      const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) router.push('/dashboard');
      };
      checkUser();
    },[]);

  return (
    <div className="max-w-md mx-auto flex flex-col items-center justify-center p-4 border rounded shadow-md mt-10">
      <h2 className="text-xl mb-4">Login</h2>
      <input className="border p-2 w-full mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 w-full mb-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleLogin}>Login</button>
    </div>
  );
}
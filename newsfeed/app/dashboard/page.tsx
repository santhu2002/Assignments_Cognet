'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        // console.log('User:', user);
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  const handlePost = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    let imagePath = '';
    if (image) {
      const formData = new FormData();
      formData.append('file', image);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      imagePath = data.filePath;
    }

    await supabase.from('posts').insert({
      user_id: user.id,
      text,
      image_url: imagePath,
    });

    setText('');
    setImage(null);
    router.push('/');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto flex flex-col gap-4 justify-center p-4 border rounded shadow-md mt-10">
      <h2 className="text-xl mb-4">Create Post</h2>
      <textarea
        className="border p-2 w-full mb-2"
        rows={4}
        placeholder="What's on your mind?"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <input
        type="file"
        className="mb-2 border p-2 bg-gray-200"
        onChange={e => setImage(e.target.files?.[0] || null)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handlePost}
      >
        Post
      </button>
    </div>
  );
}

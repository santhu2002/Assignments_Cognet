'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      setPosts(data || []);
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 flex justify-center">News Feed</h2>
      <div className='flex flex-wrap justify-center gap-4'>

      {posts.map(post => (
        <div key={post.id} className="border p-4 mb-4 flex flex-col items-center justify-between rounded w-[30%]">
          <p>{post.text}</p>
          {post.image_url && <img src={post.image_url} alt="post" className="cover" />}
        </div>
      ))}
      </div>
    </div>
  );
}
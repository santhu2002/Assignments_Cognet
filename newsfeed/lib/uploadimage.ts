// lib/uploadImage.ts
import { supabase } from './supabase';

export const uploadImage = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { data, error } = await supabase.storage
    .from('post-images')
    .upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from('post-images')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
};

// app/_components/GlobalInit.tsx
'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetProducts } from '@/redux/slices/productsSlice';
import { AppDispatch } from '@/redux/store';
import { RootState } from '@/redux/store';

export default function GlobalInit() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log("global")
    dispatch(fetchGetProducts());
  }, []);

  return null;
}
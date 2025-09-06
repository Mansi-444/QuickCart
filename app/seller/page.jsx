'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "@clerk/nextjs"; 


const AddProduct = () => {

  const { getToken } = useAppContext()
  

  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('name',name)
    formData.append('description',description)
    formData.append('category',category)
    formData.append('price',price)
    formData.append('offerPrice',offerPrice)
    

    for(let i = 0; i< files.length; i++) {
      formData.append('images',files[i]);
    }

    try{
    
      const token = await getToken();

      const {data } = await axios.post('/api/product/add',formData,{headers:{Authorization:`Bearer ${token}`},
      });
        console.log("Response:", data);


        if(data.success) {
          toast.success(data.message)
          setFiles([]);
          setName('');
          setDescription('');
          setCategory('Earphone');
          setPrice('');
          setOfferPrice('');
        }else {
         toast.error(data.message);
        }

    }catch (error) {
    console.error("Full error:", error.response?.data || error.message);
    toast.error(error?.response?.data?.message || error?.message || "Something went wrong!");
  }
}};


    
  




    


  
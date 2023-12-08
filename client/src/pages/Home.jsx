import React from 'react'
import '../css/Home.css'
import axios from 'axios'
import{ useForm } from 'react-hook-form'


function Home() {

  const {register,handleSubmit, } = useForm()

  const onSubmit = handleSubmit(data=>{
    console.log(JSON.stringify(data.image))
  })


  return (
    <div className='general-container'>
      <h1>Registro de usuarios</h1>
      <form className='form' onSubmit={onSubmit}>
        <label className='labels'>
          Nombre:
          <input type="text" {...register("name", { required: true})}/>
        </label>

        <label className='labels'>
          Apellido:
          <input type="text" {...register("lastName", { required: true})} />
        </label>

        <label className='labels'>
          Perfil:
          <input type="file" className='files' {...register("image", { required: true})} />
        </label>
        <input type="submit" value="Enviar" />

      </form>
    </div>
  )
}

export default Home
import React, { useState } from "react";
import "../css/Home.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHome } from "../context/HomeContext";
import { Link } from "react-router-dom";

function Home() {
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const { register, handleSubmit } = useForm();
  const { insertImage } = useHome();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("name", data.name);
    formData.append("lastName", data.lastName);
    //console.log(formData);
    const res = await insertImage(formData);
    console.log(res);
    setImage(res);
  };

  return (
    <div className="general-container">
      <h1>Registro de usuarios</h1>
      <Link to="/consult">Ver usuarios</Link>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label className="labels">
          Nombre:
          <input type="text" {...register("name", { required: true })} />
        </label>

        <label className="labels">
          Apellido:
          <input type="text" {...register("lastName", { required: true })} />
        </label>

        <label className="labels">
          Perfil:
          <input
            type="file"
            className="files"
            {...register("image", { required: true })}
            onChange={handleImageChange}
          />
        </label>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Imagen preview"
            style={{ width: "200px" }}
          />
        )}
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
}

export default Home;

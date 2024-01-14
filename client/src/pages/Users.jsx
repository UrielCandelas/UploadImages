import React, { useEffect } from "react";
import { useHome } from "../context/HomeContext";

function Users() {
  const { getImage, data } = useHome();

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div>
      {data && data.map((element,i) => (
        <div key={i}>
          <p>{element.name}</p>
          <p>{element.lastName}</p>
          {element.image && (
            <img
              src={`data:image/png;base64,${element.image}`}
              alt={`Profile Image of ${element.name} ${element.lastName}`}
              style={{ width: "200px" }}
              loading="lazy"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Users;

import React, { useState } from "react";
import axios from "axios";

const CreateMaterialForm = ({ accessToken }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMaterial = {
      name: name,
      content: content,
    };

    axios
      .post("/api/materials", newMaterial, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("New material created:", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form className="create__material" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        className="input1"
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="content">Content:</label>
      <textarea
        className="input2"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="submit">Create Material</button>
    </form>
  );
};

export default CreateMaterialForm;
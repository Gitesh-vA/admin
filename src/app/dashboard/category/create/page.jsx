"use client";

import { useState } from "react";

export default function create() {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleCreateCategory = () => {
    try {
      if (category != "" && image) {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", category);

        fetch("/api/category/create", {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        })
          .then(response => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            // Handle successful login response
          })
          .catch(error => {
            console.error("Error:", error);
            // Handle fetch error
          });
      } else {
        alert("Please fill Category field");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageChange = e => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <div className="card card-info">
        <div className="card-header">
          <h3 className="card-title">Create Category</h3>
        </div>
        <div className="form-horizontal">
          <div className="card-body">
            <div className="form-group row">
              <label htmlFor="categoryName" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  onChange={e => setCategory(e.target.value)}
                  id="categoryName"
                  placeholder="Category Name"
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="categoryImage"
                className="col-sm-2 col-form-label">
                Image
              </label>
              <div className="col-sm-10">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e)}
                  className="form-control"
                  id="categoryImage"
                  style={{padding: "3px"}}
                />
              </div>
            </div>
            {/* <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck2"/>
                                        <label className="form-check-label" htmlFor="exampleCheck2">Remember me</label>
                                </div>
                            </div>
                        </div> */}
          </div>
          <div className="card-footer">
            <button
              onClick={() => handleCreateCategory()}
              className="btn btn-info">
              Create
            </button>
            {/* <button type="submit" className="btn btn-default float-right">Cancel</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

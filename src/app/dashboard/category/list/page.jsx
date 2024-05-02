"use client";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import Loading from '../../../../components/Loading'

export default function list() {
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      fetch("/api/category/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }})
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          let temp = [], id =1
          data.data && data.data?.map((item) => {
            let info = {
              id: id++, name: item.name
            }
            temp.push(info)
          })
          setRows([...temp])
          setIsLoading(false)
        })
        .catch(error => {
          console.error("Error:", error);
        });
  }, []);

  const columns = [
    {field: "id", headerName: "ID", width: 70},
    {field: "name", headerName: "Name", width: 130},
  ];

  if (isLoading) {
    return <Loading />;
  }
 
  return (
    <div style={{height: 400, width: "100%"}}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {page: 0, pageSize: 5},
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}

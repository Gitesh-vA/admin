"use client";

import {useState, useEffect} from "react";
import Loading from "@/components/Loading";
import Link from "next/link";

export default function update() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/category/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        let temp = [],
          id = 1;
        data.data &&
          data.data?.map(item => {
            let info = {
              id: id++,
              name: item.name,
            };
            temp.push(info);
          });
        setRows([...temp]);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="card card-info">
        <div className="card-header">
          <h3 className="card-title">Update Category</h3>

          <div className="card-tools">
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="collapse"
              title="Collapse">
              <i className="fas fa-minus"></i>
            </button>
          </div>
        </div>
        <div className="card-body p-0">
          <table className="table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Edit</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows && rows.length > 0 ? (
                rows.map((row, key) => (
                  <>
                    <tr>
                      <td>{row.name}</td>
                      <td className="align-middle">
                        <div className="btn-group btn-group-sm">
                          <Link href="/dashboard/category/update/[id]" as={`/dashboard/category/update/${key}`}>
                            <span className="btn btn-info">
                              <i className="fas fa-eye"></i>
                            </span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </>
                )
                )) : (
                <>No Category found!.</>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

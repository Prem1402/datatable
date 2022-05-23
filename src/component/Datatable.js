import React, { useEffect, useMemo, useState, useRef } from "react"
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  useRowSelect,
} from "react-table"
import { COLUMNS } from "./columns"
import { GlobalFilter } from "./Filter"
import { Checkbox } from "./Checkbox"
import "./Datatable.css"

export const DataTable = () => {
  const URL = "https://jsonplaceholder.typicode.com/photos"
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [pageNo, setPageNo] = useState(1)

  const ref = useRef(null)

  const columns = useMemo(() => COLUMNS, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ])
    }
  )

  const getData = () => {
    setLoading(true)
    fetch(`${URL}?_page=${pageNo}&_limit=10`)
      .then((res) => res.json())
      .then((json) => {
        if (pageNo > 1) {
          setData([...data, ...json])
        } else {
          setData(json)
        }
      })
      .catch((err) => {
        setLoading(false)
        setData([])
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getData()
  }, [pageNo])

  useEffect(() => {
    document.addEventListener("scroll", handleScroll)
    return () => document.removeEventListener("scroll", handleScroll)
  }, [])

  function handleScroll(e) {
    const cY = window.scrollY
    const tbh = ref.current.offsetHeight
    const thresh = 1000
    if (tbh - cY - thresh < 0) {
      setPageNo((prev) => prev + 1)
    }
  }

  const { globalFilter } = state

  return (
    <>
      <div>
        <div className='filter'>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
        <div>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <>
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                        {/* <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div> */}
                      </>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} ref={ref}>
              {loading && (
                <tr>
                  <td>Loading...</td>
                </tr>
              )}
              {rows.map((row) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  )
}

export default DataTable

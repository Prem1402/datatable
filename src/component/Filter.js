import React, { useState } from "react"
import { useAsyncDebounce } from "react-table"

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter)
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined)
  }, 1000)
  return (
    <span>
      Search:{" "}
      <input
        style={{ width: "20rem", height: "1.5rem" }}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
      />
    </span>
  )
}

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column
  return (
    <span>
      Search:{" "}
      <input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  )
}

import { ColumnFilter } from "./Filter"

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
    disableFilters: true,
    sticky: "left",
    Filter: ColumnFilter,
  },
  {
    Header: "Title",
    accessor: "title",
    sticky: "left",
    Filter: ColumnFilter,
  },
  {
    Header: "URL",
    accessor: "url",
    sticky: "left",
    Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "Thumbnail Url",
    accessor: "thumbnailUrl",
    Filter: ColumnFilter,
    disableFilters: true,
    Cell: ({ cell: { value } }) => <img src={value} alt='thumbnail' />,
  },
]

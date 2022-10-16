import { useState } from "react"
import { Searchbar } from "react-native-paper"

import TableSpace from "./TableSpace"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  const onChangeSearch = (query) => setSearchQuery(query)

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <TableSpace />
    </>
  )
}

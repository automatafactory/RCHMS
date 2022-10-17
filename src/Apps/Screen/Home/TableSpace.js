import * as React from "react"
import { useEffect, useState } from "react"
import { DataTable, IconButton, MD3Colors, Text } from "react-native-paper"
import storage from "../../Components/storage"

const TableSpace = () => {
  console.log("=============TableSpace=======================")
  storage.getAllDataForKey("tableData").then((data) => {
    // if (data === undefined || data === null) {
    //   return <Text> Scan to add Data </Text>
    // } else {
    data = JSON.parse(data)
    console.log(data)
    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Sl</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title numeric>ID</DataTable.Title>
          <DataTable.Title numeric>Action</DataTable.Title>
        </DataTable.Header>

        {data.map(({ date, status, id, tag }) => {
          ;<DataTable.Row>
            <DataTable.Cell numeric>{date}</DataTable.Cell>
            <DataTable.Cell numeric value={id}>
              {tag}
            </DataTable.Cell>
            <DataTable.Cell numeric>{status}</DataTable.Cell>
            <DataTable.Cell numeric>
              <IconButton
                icon="clock-time-seven"
                iconColor={MD3Colors.secondary}
                onPress={() => console.log("Pressed")}
              />
            </DataTable.Cell>
          </DataTable.Row>
        })}
      </DataTable>
    )
    // }r
  })
}

export default TableSpace

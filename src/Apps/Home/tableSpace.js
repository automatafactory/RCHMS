import * as React from "react"
import { useEffect, useState } from "react"
import { DataTable, IconButton, MD3Colors } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage"

const TableSpace = async () => {
  try {
    // const value = await AsyncStorage.getItem('@table')
    const value = null
    if (value !== null) {
      return (
        <>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Sl</DataTable.Title>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title numeric>ID</DataTable.Title>
              <DataTable.Title numeric>Action</DataTable.Title>
            </DataTable.Header>

            {/* {data.map((value, i) => (
              <DataTable.Row>
                <DataTable.Cell>{i}</DataTable.Cell>
                <DataTable.Cell numeric>{value.date}</DataTable.Cell>
                <DataTable.Cell numeric>{value.id}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <IconButton
                    icon="clock-time-seven"
                    iconColor={MD3Colors.secondary}
                    onPress={() => console.log("Pressed")}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            ))} */}
          </DataTable>
        </>
      )
    } else {
      return (
        <>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Sl</DataTable.Title>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title numeric>ID</DataTable.Title>
              <DataTable.Title numeric>Action</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>No Data Found</DataTable.Row>
          </DataTable>
        </>
      )
    }
  } catch (e) {
    console.log("==============error======================")
    console.log(e)
  }
}

export default TableSpace

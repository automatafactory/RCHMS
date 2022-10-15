import * as React from "react"
import { useEffect, useState } from "react"
import { DataTable, IconButton, MD3Colors, Text } from "react-native-paper"

const TableSpace = () => {
  async function getData() {
    await storage
      .load({
        key: "tableData",
        autoSync: true,
      })
      .then((ret) => {
        return JSON.parse(ret)
      })
      .catch((err) => {
        return undefined
      })
  }

  const [tableData, setTableData] = useState((data) => {
    getData().then((_data) => {
      if (_data === undefined) {
        storage.save({
          key: "tableData",
          data: JSON.stringify(data),
        })
      } else {
        console.log(_data)
      }
    })
  })

  useEffect(() => {
    getData()
      .then((data) => {
        if (data === undefined || data === null) {
          return <Text> Scan to add Data </Text>
        } else {
          data = data.JSON.parse(data)
          return (
            <>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Sl</DataTable.Title>
                  <DataTable.Title>Date</DataTable.Title>
                  <DataTable.Title numeric>ID</DataTable.Title>
                  <DataTable.Title numeric>Action</DataTable.Title>
                </DataTable.Header>

                {data.map(({ value, i }) => (
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
                ))}
              </DataTable>
            </>
          )
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
}

export default TableSpace

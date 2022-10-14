import type { IAppointment } from "../Appointment.types";

import React, { useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Box,
  Heading,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { sortBy } from "sort-by-typescript";

import AppointmentSearch from "./AppointmentSearch";

interface IAppointmentTable {
  appointments?: IAppointment[];
}

const AppointmentTable = ({ appointments }: IAppointmentTable) => {
  const [filter, setFilter] = useState({
    title: false,
    startAt: false,
    endAt: false,
  });

  const filterTitle = async () => {
    filter.title
      ? appointments?.sort(sortBy("title"))
      : appointments?.sort(sortBy("-title"));
    setFilter({ ...filter, title: !filter.title });
  };

  const filterStart = async () => {
    filter.startAt
      ? appointments?.sort(sortBy("startAt"))
      : appointments?.sort(sortBy("-startAt"));
    setFilter({ ...filter, startAt: !filter.startAt });
  };

  const filterEnd = async () => {
    filter.endAt
      ? appointments?.sort(sortBy("endAt"))
      : appointments?.sort(sortBy("-endAt"));
    setFilter({ ...filter, endAt: !filter.endAt });
  };

  const handleSearch = (search: string) => {
    console.log(search);
    appointments = appointments?.filter((e) => e.title.match(search));
    console.log(appointments);
  };

  if (appointments?.length === 0) {
    return (
      <Box
        flex="1"
        w="xl"
        m="4%"
        p="4%"
        maxW="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Box pb="10">
          <Heading>Appointments</Heading>
        </Box>
        <Text>No appointments</Text>
      </Box>
    );
  }

  return (
    <Box
      flex="1"
      w="xl"
      m="4%"
      p="4%"
      maxW="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box pb="10">
        <Heading>Appointments</Heading>
      </Box>
      <Box pb="10">
        <AppointmentSearch handleSearch={handleSearch} />
      </Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th onClick={filterTitle}>
                <Text as="b">Title {filter.title ? "🔽" : "🔼"}</Text>
              </Th>
              <Th onClick={filterStart}>
                <Text as="b">Start At {filter.startAt ? "🔽" : "🔼"}</Text>
              </Th>
              <Th onClick={filterEnd}>
                <Text as="b">End At {filter.endAt ? "🔽" : "🔼"}</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {appointments?.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <Text>{item.title}</Text>
                </Td>
                <Td>
                  <Text>{dayjs(item.startAt).format("DD/MM/YYYY HH:mm")}</Text>
                </Td>
                <Td>
                  <Text>{dayjs(item.endAt).format("DD/MM/YYYY HH:mm")}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AppointmentTable;

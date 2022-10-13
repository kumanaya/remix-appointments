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

import Search from "../Search";

interface IAppointmentsProps {
  data: Array<IAppointments>;
  handleFilter: (column: string, bool: boolean) => void;
  handleSearch: (search: string | undefined) => void;
}

interface IAppointments {
  id?: number;
  title: string;
  startAt: string;
  endAt: string;
}

const Appointments = ({
  data,
  handleFilter,
  handleSearch,
}: IAppointmentsProps) => {
  const [filter, setFilter] = useState({
    title: false,
    startAt: false,
    endAt: false,
  });

  const filterTitle = () => {
    setFilter({ ...filter, title: !filter.title });
    handleFilter("title", !filter.title);
  };

  const filterStart = () => {
    setFilter({ ...filter, startAt: !filter.startAt });
    handleFilter("startAt", !filter.startAt);
  };

  const filterEnd = () => {
    setFilter({ ...filter, endAt: !filter.endAt });
    handleFilter("endAt", !filter.endAt);
  };

  if (data.length === 0) {
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
          <Search handleSearch={handleSearch} />
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
        <Search handleSearch={handleSearch} />
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
            {data?.map((item) => (
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

export default Appointments;

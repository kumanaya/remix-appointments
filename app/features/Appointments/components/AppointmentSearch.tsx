import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Text, Box, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Form } from "@remix-run/react";
import * as yup from "yup";

interface IAppointmentSearch {
  handleSearch: (search: string) => any;
}

const AppointmentSearch = ({ handleSearch }: IAppointmentSearch) => {
  const formSchema = yup.object({
    search: yup.string(),
  });

  type form = yup.InferType<typeof formSchema>;

  const {
    register,
    formState: { errors },
  } = useForm<form>({
    resolver: yupResolver(formSchema),
  });

  return (
    <Form action={"/appointments"}>
      <Box display="flex">
        <Box>
          <Text>Search:</Text>
          <Input
            type="search"
            title="search"
            {...register("search")}
            isInvalid={errors.search && true}
            placeholder={errors.search?.message}
          />
        </Box>
        <Box alignSelf="flex-end">
          <IconButton
            type="submit"
            aria-label="Search database"
            icon={<SearchIcon />}
          />
        </Box>
      </Box>
    </Form>
  );
};

export default AppointmentSearch;

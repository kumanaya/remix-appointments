import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Text, Box, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import * as yup from "yup";

interface ISearch {
  handleSearch: (search: string | undefined) => any;
}

const Search = ({ handleSearch }: ISearch) => {
  const formSchema = yup.object({
    search: yup.string(),
  });

  type form = yup.InferType<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<form>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = handleSubmit((data) => {
    handleSearch(data.search);
  });

  return (
    <form className="schedule" onSubmit={onSubmit}>
      <Box display="flex">
        <Box>
          <Text>Search:</Text>
          <Input
            type="search"
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
    </form>
  );
};

export default Search;

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Text, Box, Heading, useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import * as yup from "yup";

interface IAppointments {
  id?: number;
  title: string;
  startAt: string;
  endAt: string;
}

interface ScheduleProps {
  handleInsert: (data: IAppointments) => any;
}

const Schedule = ({ handleInsert }: ScheduleProps) => {
  const toast = useToast();

  const formSchema = yup.object({
    title: yup.string().required(),
    startAt: yup.date().required(),
    endAt: yup
      .date()
      .test("isBefore", "End date need be after the start date!", validateDate)
      .required(),
  });

  type form = yup.InferType<typeof formSchema>;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<form>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = handleSubmit((data) => {
    const object = {
      title: data.title,
      startAt: dayjs(data.startAt).format(),
      endAt: dayjs(data.endAt).format(),
    };

    handleInsert(object);
  });

  function validateDate() {
    const startAt = getValues("startAt") as Date;
    const endAt = getValues("endAt") as Date;
    const isValid = dayjs(endAt).isAfter(startAt);
    if (!isValid) {
      toast({
        title: "Attention",
        description: "End date need be after the start date!",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
    return isValid;
  }

  return (
    <Box
      flex="1"
      maxW="sm"
      m="4%"
      p="4%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box pb="10">
        <Heading>Schedule</Heading>
      </Box>
      <form className="schedule" onSubmit={onSubmit}>
        <Box pb="4">
          <Text fontSize="md">Title:</Text>
          <Input
            {...register("title")}
            aria-invalid={errors.title ? "true" : "false"}
            isInvalid={errors.title && true}
            placeholder={errors.title?.message}
          />
        </Box>
        <Box pb="4">
          <Text fontSize="md">Start:</Text>
          <Input
            type="datetime-local"
            {...register("startAt")}
            aria-invalid={errors.startAt ? "true" : "false"}
            isInvalid={errors.startAt && true}
            placeholder={errors.startAt?.message}
          />
        </Box>
        <Box pb="4">
          <Text fontSize="md">End:</Text>
          <Input
            type="datetime-local"
            {...register("endAt")}
            aria-invalid={errors.endAt ? "true" : "false"}
            isInvalid={errors.endAt && true}
            placeholder={errors.endAt?.message}
          />
        </Box>
        <Input type="submit" value="Save" />
      </form>
    </Box>
  );
};

export default Schedule;

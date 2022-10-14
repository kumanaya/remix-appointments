import type { IAppointment } from "../Appointment.types";

import { Flex } from "@chakra-ui/react";

import AppointmentTable from "./AppointmentTable";
import AppointmentSchedule from "./AppointmentSchedule";

import type { ActionData } from "~/routes/appointments";

interface IAppointmentsContainer {
  appointments?: IAppointment[];
  actionData?: ActionData;
}

export default function AppointmentsContainer({
  appointments,
  actionData,
}: IAppointmentsContainer) {
  return (
    <Flex>
      <AppointmentTable appointments={appointments} />
      <AppointmentSchedule actionData={actionData} />
    </Flex>
  );
}

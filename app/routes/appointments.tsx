import type {
  LoaderFunction,
  MetaFunction,
  ActionFunction,
} from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import dayjs from "dayjs";

import type { IAppointment } from "~/features/Appointments/Appointment.types";
import {
  fetchAppointments,
  verifyAppointments,
  searchAppointments,
  insertAppointments,
} from "~/features/Appointments/Appointment.api";
import AppointmentsContainer from "~/features/Appointments/components/AppointmentContainer";

export const meta: MetaFunction = () => ({
  title: "Quaddro Challenge - Agendamentos",
});

export type ActionData = {
  data?: IAppointment;
  errors?: Partial<IAppointment>;
};

export const action: ActionFunction = async function ({
  request,
}): Promise<ActionData | LoaderFunction | IAppointment[]> {
  try {
    const body = await request.formData();
    const data = Object.fromEntries(body) as unknown as IAppointment;

    const errors = [];

    const { title, startAt, endAt } = data as IAppointment;

    const hasAppointments = await verifyAppointments(startAt);

    if (hasAppointments?.length > 0) {
      errors.push({
        key: "endAt",
        message: "Have appointment in this range date",
      });
      return {
        data,
        errors: errors.reduce((acc, cur) => {
          return { ...acc, [cur.key]: cur.message };
        }, {}),
      };
    }

    const payload = {
      title,
      startAt: dayjs(startAt).format(),
      endAt: dayjs(endAt).format(),
    };

    const appointments = await insertAppointments(payload);

    return appointments || [];
  } catch (error) {
    throw error;
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");

  if (search) {
    const appointments = await searchAppointments(search);

    return {
      appointments,
    };
  }

  const appointments = await fetchAppointments();

  return {
    appointments,
  };
};

export default function Appoitments() {
  const { appointments } = useLoaderData();
  const actionData = useActionData<ActionData>();

  console.log("verifying appointments");

  return (
    <AppointmentsContainer
      appointments={appointments}
      actionData={actionData}
    />
  );
}

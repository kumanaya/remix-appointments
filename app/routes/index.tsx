/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import { useToast } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

import Schedule from "~/components/Schedule";
import Appointment from "~/components/Appointment";

interface IAppointments {
  id?: number;
  title: string;
  startAt: string;
  endAt: string;
}

export const loader = () => {
  return json({
    url: process.env.SUPABASE_URL!,
    token: process.env.SUPABASE_TOKEN!,
  });
};

export default function Index() {
  const { url, token } = useLoaderData<typeof loader>();
  const [appointments, setAppointments] = useState<IAppointments[]>([]);
  const supabaseClient = createClient(url, token);

  const toast = useToast();

  const fetchAppointments = async () => {
    try {
      supabaseClient
        .from("appointments")
        .select()
        .then((response) => {
          if (response.error) {
            console.error("Error fetching appointments", response.error);
            toast({
              title: "Appointment",
              description: "Error fetching appointments",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            return;
          }

          if (!response.data) {
            console.error("No appointments found");
            toast({
              title: "Appointment",
              description: "No appointments found",
              status: "warning",
              duration: 9000,
              isClosable: true,
            });
            return;
          }

          setAppointments(response.data);
        });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "[Supabase] - Problem with connection",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const verifyDisponibility = async (
    data: IAppointments
  ): Promise<IAppointments[] | undefined> => {
    try {
      const response = await supabaseClient
        .from("appointments")
        .select()
        .lte("startAt", data.startAt)
        .gte("endAt", data.startAt);

      return response.data || [];
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "[Supabase] - Problem with connection",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleSearch = async (search: string | undefined): Promise<void> => {
    try {
      if (!search) {
        fetchAppointments();
        return;
      }
      supabaseClient
        .from("appointments")
        .select()
        .eq("title", search)
        .then((response) => {
          if (response.error) {
            console.error("Error search appointments", response.error);
            toast({
              title: "Appointment",
              description: "Error search appointments",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            return;
          }

          if (!response.data) {
            console.error("No appointments found");
            toast({
              title: "Appointment",
              description: "No appointments found",
              status: "warning",
              duration: 9000,
              isClosable: true,
            });
            return;
          }
          setAppointments(response.data);
        });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "[Supabase] - Problem with connection",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleInsert = async (data: IAppointments): Promise<void> => {
    try {
      const haveAppointments = await verifyDisponibility(data);

      if (haveAppointments && haveAppointments.length > 0) {
        toast({
          title: "Appointment",
          description: "Have appointmentin this range date",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      supabaseClient
        .from("appointments")
        .insert(data)
        .select()
        .then((response) => {
          if (response.error) {
            console.error("Error insert appointments", response.error);
            toast({
              title: "Appointment",
              description: "Error insert appointments",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            return;
          }

          if (!response.data) {
            console.error("No appointments found");
            toast({
              title: "Appointment",
              description: "No appointments found",
              status: "warning",
              duration: 9000,
              isClosable: true,
            });
            return;
          }

          toast({
            title: "Appointment",
            description: "Inserted with success!",
            status: "success",
            duration: 9000,
            isClosable: true,
          });

          const data = response.data as Array<IAppointments>;

          setAppointments([...appointments, data[0]]);
        });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "[Supabase] - Problem with connection",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleFilter = async (column: string, bool: boolean): Promise<void> => {
    try {
      supabaseClient
        .from("appointments")
        .select()
        .order(column, { ascending: bool })
        .then((response) => {
          if (response.error) {
            console.error("Error fetching appointments", response.error);
            toast({
              title: "Appointment",
              description: "Error fetching appointments",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            return;
          }

          if (!response.data) {
            console.error("No appointments found");
            toast({
              title: "Appointment",
              description: "No appointments found",
              status: "warning",
              duration: 9000,
              isClosable: true,
            });
            return;
          }

          setAppointments(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Flex>
        <Appointment
          data={appointments}
          handleFilter={handleFilter}
          handleSearch={handleSearch}
        />
        <Schedule handleInsert={handleInsert} />
      </Flex>
    </div>
  );
}

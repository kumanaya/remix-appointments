import type { IAppointment } from "./Appointment.types";
import { supabaseClient } from "~/utils/supabase.server";

export const fetchAppointments = async function (): Promise<IAppointment[]> {
  try {
    console.log("fetching...");
    const { data } = await supabaseClient.from("appointments").select();
    return data || [];
  } catch (error) {
    throw error;
  }
};

export const verifyAppointments = async function (
  startAt: string
): Promise<IAppointment[]> {
  try {
    const { data } = await supabaseClient
      .from("appointments")
      .select()
      .lte("startAt", startAt)
      .gte("endAt", startAt);

    return data || [];
  } catch (error) {
    throw error;
  }
};

export const searchAppointments = async function (
  search: string
): Promise<IAppointment[]> {
  try {
    const { data } = await supabaseClient
      .from("appointments")
      .select()
      .eq("title", search);

    return data || [];
  } catch (error) {
    throw error;
  }
};

export const insertAppointments = async function (
  payload: IAppointment
): Promise<IAppointment[]> {
  try {
    console.log("inserting...");
    const { data } = await supabaseClient
      .from("appointments")
      .insert(payload)
      .select();
    return data || [];
  } catch (error) {
    throw error;
  }
};

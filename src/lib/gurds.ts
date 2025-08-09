import {patientConditions} from "@/config/patientConditions";
import type { PatientCondition } from "@/types/patient";

const conditionValues = patientConditions.map((p)=>p.value) as PatientCondition[];

export function isPatientCondition(v:unknown):v is PatientCondition{
    return typeof v === "string" && (conditionValues as readonly string[]).includes(v);
}
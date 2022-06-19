import IEmployee from "../../Interfaces/Employee";
import { getUuid } from "../Common";
import FetchAPI from "../FetchAPI";

// To get the employees list from the JSON server database.
const getEmployeesList = async () => await FetchAPI("Employees");

// To get the single employee record from the JSON server database by its employee id.
const getEmployeeRecord = async (id: number) =>
  await FetchAPI("Employees/" + id);

// Create/Update Employee record to the JSON server database for the given Employee Id (for update).
const saveEmployee = async (record: IEmployee) =>
  await FetchAPI(`Employees${record.id ? "/" + record.id : ""}`, {
    method: record.id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...record, id: record.id || getUuid() }),
  });

// Delete the Employee record from the JSON server database by using the Employee Id.
const deleteEmployee = async (id: number) =>
  await FetchAPI("Employees/" + id, { method: "DELETE" });

export { getEmployeesList, getEmployeeRecord, saveEmployee, deleteEmployee };

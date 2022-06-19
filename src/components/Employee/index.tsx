import { useEffect, useState } from "react";
import IEmployee from "../../Interfaces/Employee";
import {
  getEmployeesList,
  getEmployeeRecord,
  saveEmployee,
  deleteEmployee,
} from "../../utility/EmployeeManager";
import "./index.css";
import Modal from "../Modal";

const Employee = (props: any): JSX.Element => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [employeeRecord, setEmployeeRecord] = useState<IEmployee>(
    {} as IEmployee
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    bindEmployeesData();
  }, []);

  const bindEmployeesData = () =>
    getEmployeesList().then((response) => {
      const employeesArray = response as IEmployee[];
      setEmployees(employeesArray.filter((employee) => !employee.isAdmin));
    });
  const handleClickCreate = () => {
    setEmployeeRecord({} as IEmployee);
    setShowModal(true);
  };
  const handleClickEdit = (id: number) => {
    getEmployeeRecord(id).then((response) => {
      setEmployeeRecord(response as IEmployee);
      setShowModal(true);
    });
  };
  const handleClickDelete = (id: number) => {
    deleteEmployee(id).then(() => bindEmployeesData());
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    saveEmployee(employeeRecord).then((response) => {
      console.info("handleSubmit > response: ", response);
      setShowModal(false);
      bindEmployeesData();
    });
  };
  const handleChange = (e: any) => {
    setEmployeeRecord({
      ...employeeRecord,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  return (
    <>
      <h2>Manage {props.moduleName}</h2>
      <button
        className="btn btn-green btn-add-record"
        onClick={() => handleClickCreate()}
      >
        Add {props.moduleName}
      </button>
      <table className="data-grid">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
            <th>Feedback</th>
            <th>Add Feedback</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {(employees.length &&
            employees.map((employee, index) => (
              <tr key={employee.id + index}>
                <td>{index + 1}</td>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.age}</td>
                <td>{employee.email}</td>
                <td>{employee.userName}</td>
                <td>{employee.password}</td>
                <td>{employee.feedback}</td>
                <td>
                  <button
                    className="btn btn-green"
                    onClick={() => handleClickEdit(employee.id)}
                  >
                    Add Feedback
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-blue"
                    onClick={() => handleClickEdit(employee.id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-red"
                    onClick={() => handleClickDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))) || <></>}
        </tbody>
      </table>
      <div>
        <Modal
          title={`${
            employeeRecord.id
              ? `Edit ${props.moduleName} - ` + employeeRecord.id
              : `Create ${props.moduleName}`
          }`}
          isOpen={showModal}
          toggle={() => {
            setShowModal(false);
          }}
        >
          <form className="employee-form pad-top-10" onSubmit={handleSubmit}>
            <div className="row">
              <div className="column">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={employeeRecord.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="column">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={employeeRecord.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="column">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={employeeRecord.age}
                  onChange={handleChange}
                  required
                  min={18}
                  max={70}
                />
              </div>
              <div className="column">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={employeeRecord.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="column">
                <label>Username</label>
                <input
                  type="text"
                  name="userName"
                  value={employeeRecord.userName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="column">
                <label>Password</label>
                <input
                  type="text"
                  name="password"
                  value={employeeRecord.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="column">
                <label>Perofrmance Review</label>
                <textarea
                  name="review"
                  value={employeeRecord.review}
                  onChange={handleChange}
                />
              </div>
              <div className="column">
                <label>Feedback</label>
                <textarea
                  name="feedback"
                  value={employeeRecord.feedback}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="column">
                <div className="btn-group">
                  <button
                    className="btn btn-green btn-modal-save"
                    type="submit"
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-red btn-modal-close"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Employee;

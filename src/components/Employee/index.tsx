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
import { isValid, mergeStrings } from "../../utility/Common";

const Employee = (props: any): JSX.Element => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [reviewers, setReviewers] = useState<IEmployee[]>([]);
  const [reviewForEmployees, setReviewForEmployees] = useState<IEmployee[]>([]);
  const [employeeRecord, setEmployeeRecord] = useState<IEmployee>(
    {} as IEmployee
  );
  const [showModal, setShowModal] = useState(false);
  const [isEditRecord, setIsEditRecord] = useState(false);

  const isEmpoloyeeModule = props.moduleName === "Employee";
  const isPerformanceModule = props.moduleName === "Performance Review";
  const isFeedbackModule = props.moduleName === "Feedback";

  useEffect(() => {
    bindEmployeesData();
  }, []);

  const bindEmployeesData = () =>
    getEmployeesList().then((response) => {
      const employeesArray = response as IEmployee[];
      setEmployees(
        employeesArray.filter(
          (emp) =>
            !emp.isAdmin &&
            (isPerformanceModule || isFeedbackModule
              ? isValid(emp.review)
              : true)
        )
      );
      setReviewers(employeesArray.filter((emp) => !emp.isAdmin));
    });
  const bindEmployeeCombos = (isEdit: boolean) => {
    getEmployeesList().then((response) => {
      const employeesArray = response as IEmployee[];
      setReviewForEmployees(
        employeesArray.filter(
          (emp) => !emp.isAdmin && (isEdit || !isValid(emp.review))
        )
      );
      setReviewers(employeesArray.filter((emp) => !emp.isAdmin));
      setShowModal(true);
    });
  };
  const bindEmployeeRecord = (id: string, isEdit: boolean) => {
    getEmployeeRecord(id).then((response) => {
      setEmployeeRecord(response as IEmployee);
      if (isPerformanceModule || isFeedbackModule) {
        bindEmployeeCombos(true);
      } else {
        setShowModal(true);
      }
      setIsEditRecord(isEdit);
    });
  };
  const handleClickCreate = () => {
    setEmployeeRecord({} as IEmployee);

    if (isPerformanceModule) {
      bindEmployeeCombos(false);
    } else {
      setShowModal(true);
    }
    setIsEditRecord(false);
  };
  const handleClickEdit = (id: string) => {
    bindEmployeeRecord(id, true);
  };
  const handleClickDelete = (id: string) => {
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
    if (e.target.name === "id") {
      bindEmployeeRecord(e.target.value, false);
    }
    setEmployeeRecord({
      ...employeeRecord,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h1>Manage {props.moduleName}</h1>
      {!isFeedbackModule ? (
        <button
          className="btn btn-green btn-add-record"
          onClick={() => handleClickCreate()}
        >
          Add {props.moduleName}
        </button>
      ) : null}
      <table className="data-grid">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>{!isEmpoloyeeModule ? "Employee" : ""} Id</th>
            {isEmpoloyeeModule ? (
              <>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Username</th>
                <th>Password</th>
              </>
            ) : (
              <th>Employee Name</th>
            )}
            {isPerformanceModule ? (
              <>
                <th>Performance Review</th>
                <th>Feedback</th>
                <th>Reviewer</th>
              </>
            ) : null}
            {isFeedbackModule ? (
              <>
                <th>Feedback</th>
                <th>Save Feedback</th>
              </>
            ) : (
              <th>Edit</th>
            )}
            {isEmpoloyeeModule ? <th>Delete</th> : null}
          </tr>
        </thead>
        <tbody>
          {employees.length
            ? employees.map((emp, index) => {
                const reviewer = reviewers.filter(
                  (rev) => rev.id === emp.reviewerId
                )[0];
                return (
                  <tr key={emp.id + index}>
                    <td>{index + 1}</td>
                    <td>{emp.id}</td>
                    {isEmpoloyeeModule ? (
                      <>
                        <td>{emp.firstName}</td>
                        <td>{emp.lastName}</td>
                        <td>{emp.age}</td>
                        <td>{emp.email}</td>
                        <td>{emp.userName}</td>
                        <td>{emp.password}</td>
                      </>
                    ) : (
                      <td>{mergeStrings(emp.firstName, emp.lastName)}</td>
                    )}
                    {isPerformanceModule ? (
                      <>
                        <td>{emp.review}</td>
                        <td>{emp.feedback}</td>
                        <td>
                          {mergeStrings(
                            reviewer?.firstName,
                            reviewer?.lastName
                          )}
                        </td>
                      </>
                    ) : null}
                    {isFeedbackModule ? <td>{emp.feedback}</td> : null}
                    <td>
                      <button
                        className={`btn ${
                          isFeedbackModule
                            ? !isValid(emp.feedback)
                              ? "btn-green"
                              : "btn-blue"
                            : "btn-blue"
                        }`}
                        onClick={() => handleClickEdit(emp.id)}
                      >
                        {isFeedbackModule
                          ? !isValid(emp.feedback)
                            ? "Add"
                            : "Edit"
                          : "Edit"}
                      </button>
                    </td>
                    {isEmpoloyeeModule ? (
                      <td>
                        <button
                          className="btn btn-red"
                          onClick={() => handleClickDelete(emp.id)}
                        >
                          Delete
                        </button>
                      </td>
                    ) : null}
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
      <div>
        <Modal
          title={`${
            isEditRecord
              ? `Edit ${props.moduleName} - ` + employeeRecord.id
              : `Add ${props.moduleName}`
          }`}
          isOpen={showModal}
          toggle={() => {
            setShowModal(false);
          }}
        >
          <form className="employee-form pad-top-10" onSubmit={handleSubmit}>
            {isEmpoloyeeModule ? (
              <>
                <div className="row">
                  <div className="column">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={employeeRecord.firstName}
                      onChange={handleChange}
                      required
                      disabled={!isEmpoloyeeModule}
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
                      disabled={!isEmpoloyeeModule}
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
                      disabled={!isEmpoloyeeModule}
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
                      disabled={!isEmpoloyeeModule}
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
              </>
            ) : null}
            {isPerformanceModule || isFeedbackModule ? (
              <>
                <div className="row">
                  <div className="column">
                    <label>Review For</label>
                    <select
                      name="id"
                      value={employeeRecord.id}
                      onChange={handleChange}
                      required
                      disabled={isEditRecord}
                    >
                      <option value="">Select</option>
                      {reviewForEmployees.map((emp, index) => (
                        <option key={"rfe" + emp.id + index} value={emp.id}>
                          {mergeStrings(emp.firstName, emp.lastName)}
                        </option>
                      ))}
                    </select>
                  </div>
                  {isPerformanceModule ? (
                    <div className="column">
                      <label>Reviewer</label>
                      <select
                        name="reviewerId"
                        value={employeeRecord.reviewerId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select</option>
                        {reviewers
                          .filter((emp) => emp.id !== employeeRecord.id)
                          .map((emp, index) => (
                            <option key={"rev" + emp.id + index} value={emp.id}>
                              {mergeStrings(emp.firstName, emp.lastName)}
                            </option>
                          ))}
                      </select>
                    </div>
                  ) : null}
                </div>
                <div className="row">
                  <div className="column">
                    <label>Perofrmance Review</label>
                    <textarea
                      name="review"
                      value={employeeRecord.review}
                      onChange={handleChange}
                      required={isPerformanceModule || isFeedbackModule}
                      disabled={isFeedbackModule}
                    />
                  </div>
                  <div className="column">
                    <label>Feedback</label>
                    <textarea
                      name="feedback"
                      value={employeeRecord.feedback}
                      onChange={handleChange}
                      required={isFeedbackModule}
                    />
                  </div>
                </div>
              </>
            ) : null}
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

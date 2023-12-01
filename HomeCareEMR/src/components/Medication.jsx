/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

export default function Medication(props) {
  const id = props.id;
  console.log(id);
  const taskData = props.data;
  console.log(taskData[0].childStateOtherTasks.took);
  return (
    <>
        <table className="fl-table">
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Meds Witnessed</th>
                    <th>Insuline</th>
                    <th>Anticoagulant</th>

                </tr>
            </thead>
            <tbody>
                {taskData.map((task) => {

                    if(task?.patientId === id){
                        console.log(task.childStateOtherTasks.took)
                        return(
                            
                            <tr>
                                <td>{task?.createDateTime}</td>
                                <td>{task?.childStateOtherTasks.reason?  "Refused / " + task?.childStateOtherTasks.reason:"" }{task?.childStateOtherTasks.took? "Yes":""} {!task?.childStateOtherTasks.took && !task?.childStateOtherTasks.reason?  "N/A":""}</td>
                                <td>{task?.childStateInsulinInjection? "Yes":"N/A"}/{task?.childStateInsulinInjection.injectjionSite}</td>
                                <td>{task?.childStateAnticoagulantInjection? "Yes":"N/A"}/{task?.childStateAnticoagulantInjection.injectjionSite}</td>
                            </tr>
                        )

                    }
                })}
            </tbody>
        </table>
    </>
  )
}

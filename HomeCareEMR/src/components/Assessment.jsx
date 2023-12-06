/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */


export default function Assessment(props) {
    const id = props.id;
    console.log(id);
    const vitalSign = props.data;
    console.log(vitalSign[3]?.patientId);
  return (
    <>
        <table className="fl-table">
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Edema Assessment</th>
                    <th>Nurse</th>

                </tr>
            </thead>
            <tbody>
                {vitalSign.map((vitalSign) => {
                    if(vitalSign?.patientId === id){
                        return(
                            <tr>
                                <td>{vitalSign?.createDateTime}</td>
                                <td>{vitalSign?.childStateOtherTasks.edemaAssessResult? vitalSign?.childStateOtherTasks.edemaAssessResult:"N/A"}</td>
                                <td>{vitalSign?.user}</td>
                            </tr>
                        )

                    }
                })}
            </tbody>
        </table>
    </>
  )
}

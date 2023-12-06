/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */


export default function VitalSign(props) {
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
                    <th>Blood Pressure</th>
                    <th>Pulse</th>
                    <th>SPO2</th>              
                    <th>Glucose Level</th>
                    <th>Nurse</th>
                </tr>
            </thead>
            <tbody>
                {vitalSign.map((vitalSign) => {
                    if(vitalSign?.patientId === id){
                        return(
                            <tr>
                                <td>{vitalSign?.createDateTime}</td>
                                <td>{vitalSign?.childStateBloodPressure.sbp}/{vitalSign?.childStateBloodPressure.dbp}</td>
                                <td>{vitalSign?.childStatePulse.pulse}</td>
                                <td>{vitalSign?.childStateSpo.spo2}</td>
                                <td>{vitalSign?.childStateBloodGlucose.bloodGlucoseLevel}/{vitalSign?.childStateBloodGlucose.fasting}</td>
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

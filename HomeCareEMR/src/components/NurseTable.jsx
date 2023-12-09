import {TextField, Container} from '@mui/material';
import VaccinesTwoToneIcon from '@mui/icons-material/VaccinesTwoTone';
import HealingTwoToneIcon from '@mui/icons-material/HealingTwoTone';


export default function NurseTable(props) {
    const nurses = props.data;
  return (
    <div className="main-content">

            <h2>< VaccinesTwoToneIcon/><em> Nurse Team </em> <HealingTwoToneIcon /></h2>
            <div className="table-wrapper" >
                                <br></br>
                                <br></br>
                                <br></br>
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Position</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {nurses.map((nurse) => {
                        return(
                            <tr>
                                <td>{nurse?.firstName} {nurse?.lastName}</td>
                                <td>{nurse?.gender}</td>
                                <td>{nurse?.position}</td>
                                <td>{nurse?.phone}</td>
                                <td>{nurse?.address}</td>
                               
                               

                               
                            </tr>
                            
                        )

                    })}
                </tbody>
            </table>
            <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
            </div>

    </div>
        
  )
}

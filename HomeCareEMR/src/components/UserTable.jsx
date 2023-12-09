import VaccinesTwoToneIcon from '@mui/icons-material/VaccinesTwoTone';
import HealingTwoToneIcon from '@mui/icons-material/HealingTwoTone';

export default function userTable(props) {
    console.log(props);
    const users = props.data;
  return (
    <>
        <div className="main-content">

            <h2>< VaccinesTwoToneIcon/><em> Nurse Team </em> <HealingTwoToneIcon /></h2>
            <div className="table-wrapper" >
                                <br></br>
                                <br></br>
                                <br></br>
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Role</th>
                        <th>Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return(
                            <tr>
                                <td>{user?.username}</td>
                                <td>{user?.role}</td>
                                <td><button onClick={() => props.deleteUser(user.id)}>Delete</button></td>
                            </tr>
                            
                        )

                    }
                    )}
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
    </>
  )
}

/* eslint-disable react/jsx-key */

import {useState} from 'react';
import MitrixCheckBox from "./MatrixCheckBox"

export default function CheckboxComponent() {
    const [permission, setPermission] = useState({
        "Blood Pressure":{            
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        },
        "Pulse":{
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        },
        "Spo2":{
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        },
        "Blood Glucose":{
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        },
    "Aanticoagulant Injection":{
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        },
});

const handlesubmit = () => {
    Object.keys(permission['Blood Pressure']).map((key)=>
        permission['Blood Pressure'][key] === true ? console.log(key) : null 
      )
}

  return (
    <>
    <div className="grid">
        <span></span>
        <span>Monday</span>
        <span>Tuesday</span>
        <span>Wednesday</span>
        <span>Thursday</span>
        <span>Friday</span>
        <span>Saturday</span>
        <span>Sunday</span>
        {Object.keys(permission).map((key)=>
            <MitrixCheckBox 
                key={key}
                permission={permission[key]}
                setPermission={(newPermission) => {
                    setPermission({
                        ...permission, 
                        [key]:{ ...newPermission},
                });
                }}
                    
                label={key} />
        )

        } 
 
    </div>
    <button onClick={handlesubmit}>submit</button>
    </>
  )
}

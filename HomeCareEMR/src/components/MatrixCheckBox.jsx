/* eslint-disable react/prop-types */
import Checkbox from '@mui/material/Checkbox';


export default function MatrixCheckBox({label, permission, setPermission}) {


    const handleChange = (isChecked) => {
        setPermission({ 
            monday: isChecked,
            tuesday: isChecked,
            wednesday: isChecked,
            thursday: isChecked,
            friday: isChecked,
            saturday: isChecked,
            sunday: isChecked,
            daily: isChecked,

        });
    };
    function handleDailyChange(day, isChecked){
        if(!isChecked){
            setPermission({...permission, [day]: isChecked, daily: false})
        }else{
            setPermission({...permission, [day]: isChecked})
        }

    }

  return (
    <>
        {label}
        <Checkbox
            // eslint-disable-next-line react/prop-types
            checked={permission.monday}
            inputProps={{ 'aria-label': 'controlled' }}
            onChange={(e) => 
                handleDailyChange('monday', e.target.checked)
                }
        />
        <Checkbox
            checked={permission.tuesday}
            inputProps={{ 'aria-label': 'controlled' }}
            onChange={(e) => 
                handleDailyChange('tuesday', e.target.checked)}
        />
        <Checkbox
            checked={permission.wednesday}
            inputProps={{ 'aria-label': 'controlled' }}
            onChange={(e) => 
                handleDailyChange('wednesday', e.target.checked)}
        />
        <Checkbox
            checked={permission.thursday}
            inputProps={{ 'aria-label': 'controlled' }}
            onChange={(e) => 
                handleDailyChange('thursday', e.target.checked)}
        />
        <Checkbox
            checked={permission.friday}
            inputProps={{ 'aria-label': 'controlled' }}
            onChange={(e) => 
                handleDailyChange('friday', e.target.checked)}
        />
        <Checkbox
            checked={permission.saturday}
            inputProps={{ 'aria-label': 'controlled' }}
            onChange={(e) => 
                handleDailyChange('saturday', e.target.checked)}
        />
        <Checkbox
            checked={permission.sunday}
            inputProps={{ 'aria-label': 'controlled' }}
            onChange={(e) => 
                handleDailyChange('sunday', e.target.checked)}
        />
        <Checkbox
            checked={permission.daily}
            inputProps={{ 'aria-label': 'controlled' }}
            onChange={(e) => 
                handleChange(e.target.checked)}
        />

    </>
  )
}

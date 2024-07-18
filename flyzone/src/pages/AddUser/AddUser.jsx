import React, { useState } from 'react'
import Button from '../../components/Generic/Button/Button'
import Input from '../../components/Generic/Input/Input'
import AuthHeader from '../../components/AuthHeader/AuthHeader'
import SideBar from '../../components/SideBar/SideBar'
// import fakeData from '../../fakeData.json'
import Switch from '../../components/Generic/Switch/Switch'
import Select from "../../components/Generic/Select/Select"
import { companiesDb } from '../../dataFake'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from "../../components/Generic/Checkbox/Checkbox"
import './AddUser.css'

const AddUser = () => {

const [selectedCompany, setSelectedCompany] = React.useState(companiesDb[0].name)

const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value)
}

let value = companiesDb.map((element)=> element.name)
console.log(value)


const handleAddUser = ()=> {
    console.log("pilot added")
}

  return (
    <div className='addUser_main'>
        <AuthHeader />
        <div className='addUser_content'>
            <div className='addUser_left'>
                <SideBar />
            </div>
            <div className='addUser_center'>
                <div className='addUser_headline'>Add User</div>
                <div className='addUser_rows'>
                <div className='addUser_addingUser'>
                    <div className='addUser_parameter'>
                        {/* {fakeData.map(({firstName, lastName, userName, password, group_id}) => <div>{firstName}</div> )} */}
                        <div className='addUser_text'><h4 className='addUser_key'>First name:</h4></div>
                        <div className='adduser_input'><Input /></div>
                    </div>
                    <div className='addUser_parameter'>
                        <div className='addUser_text'><h4 className='addUser_key'>Last name:</h4></div>
                        <div className='adduser_input'><Input /></div>
                    </div>
                    <div className='addUser_parameter'>
                        <div className='addUser_text'><h4 className='addUser_key'>User name:</h4></div>
                        <div className='adduser_input'><Input /></div>
                    </div>
                    <div className='addUser_parameter'>
                        <div className='addUser_text'><h4 className='addUser_key'>Password:</h4></div>
                        <div className='adduser_input'><Input /></div>
                    </div>
                    <div className='addUser_parameter'>
                        <div className='addUser_text'><h4 className='addUser_key'>Group key:</h4></div>
                        <div className='adduser_input'>
                            <Select 
                                value={selectedCompany}
                                onChange={handleCompanyChange}
                                label="Company Name"
                            >
                                {companiesDb.map((element)=> <MenuItem value={element.name}>{element.name}</MenuItem>)}
                            </Select>
                        </div>
                    </div>
                </div>
                    <div className='addUser_switches'>
                        <div className='addUser_switchDiv'>
                                <div className='addUser_switchText'><h4 className='addUser_key'>Group key:</h4></div>
                                <div className='add_switch'><Switch /></div>
                        </div>
                        <div className='addUser_switchDiv'>
                                <div className='addUser_switchText'><h4 className='addUser_key'>Group key:</h4></div>
                                <div className='add_switch'><Switch /></div>
                        </div>
                        <div className='addUser_switchDiv'>
                                <div className='addUser_switchText'><h4 className='addUser_key'>Group key:</h4></div>
                                <div className='add_switch'><Switch /></div>
                        </div>
                        <div>
                            <div><Checkbox /></div>
                        </div>
                    </div>
                </div>
             
                <div className='addUser_button'>
                    <Button 
                        customStyles={{alignItems:"start"}}
                        text="Add"
                        onClick={handleAddUser}
                    />
                </div>
            </div>
        </div>
 
    </div>
  )
}

export default AddUser
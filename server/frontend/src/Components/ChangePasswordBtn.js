import React, { Component } from "react";
import '../Components/css/MyAccount.css';

class ChangePasswordBtn extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
            <button className="changebtn" id = "changePasswordBtn">Change</button>
          );
    }
}
 
export default ChangePasswordBtn;
import React, { Component } from "react";
import '../Components/css/MyAccount.css';

class ChangeUsernameBtn extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
            <button className="changebtn" id="changeUsernameBtn">Change</button>
          );
    }
}
 
export default ChangeUsernameBtn;
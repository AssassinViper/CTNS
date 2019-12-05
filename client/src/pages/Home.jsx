import React, { Component } from 'react'
import bg from '../assets/images/rasht.png'
import Consts from '../utils/Consts';
import {withRouter} from "react-router-dom";

class Home extends Component {

    componentDidMount(){
        let con = document.getElementsByClassName("App")[0];
        con.style.backgroundImage = `url(${bg})`
    }

    admin = ()=>{

        this.props.history.push("/admin/auth");
    }

    render() {
        return (
            <div style={s.con}>

                <div style={s.admin} onClick={this.admin}>{"کتونی ادمین"}</div>

                <div style={{fontSize:'26vmin', color:Consts.colors.c1}}>{"کتونی"}</div>

                <div style={{fontSize:'13vmin', color:Consts.colors.d1}}>{"... "+"به زودی"}</div>
            
            </div>
        )
    }
}

export default withRouter(Home);

const s = {

    con:{
        height:'70vh',
        width:'80vw',
        display:'flex',
        backgroundColor:'rgba(0,0,0,0.6)',
        borderRadius:10,
        flexDirection:'column',
        justifyContent:'center',
        fontFamily:'IranSans',
        userSelect:'none'
    },

    admin:{
        
        position:'absolute',
        cursor:'pointer',
        top:'5vh',
        right:'5vh',
        fontSize:"1.1em",
        opacity:0.8,
        paddingBottom:5,
        borderWidth:0,
        borderBottomWidth:1,
        borderStyle:'solid',
        borderColor:Consts.colors.a1,
        color:Consts.colors.a1
    }
}

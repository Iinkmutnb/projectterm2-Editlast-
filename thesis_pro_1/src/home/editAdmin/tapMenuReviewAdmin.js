import React, { Component } from 'react';
import {Menu} from 're-bulma';
import {Tabs,TabGroup,Tab} from 're-bulma';
import cookie from 'react-cookies';
import { Link} from 'react-router-dom'
class tapMenuReviewAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {checkActiveTabBar:1,userType:''

        }
    }
    componentWillMount() {
        console.log("tapConnect")
        var userType= cookie.load('userType');
        this.setState({userType:userType});
        if(window.location.pathname=="/editAdmin/reviewAdmins/reviewAdmin1"){
            this.setState({checkActiveTabBar:1})
        }
        else if(window.location.pathname=="/editAdmin/reviewAdmins/reviewAdmin2"){
                this.setState({checkActiveTabBar:2})
            }
       
               
        this.props.setExact(true,true,2);
     

    }
    componentDidMount() {
        this.props.setExact(true,true,2);
    }
    setIsActiveTabBar=(value)=>{
            this.setState({checkActiveTabBar:value})
        
    }

    render() {
        if(this.state.userType=="admin"){
        return (
            <div>
                
                <Tabs tabStyle="isBoxed">
                    <TabGroup>
                    {this.state.checkActiveTabBar==1?
                        (
                                <div>
                                    <Tab  isActive>
                                        <Link  to="/editAdmin/reviewAdmins/reviewAdmin1" style={{outline:'0', textDecoration: 'none',border:'none'}} onClick={() =>this.setIsActiveTabBar(1)}>
                                            ลบการรีวิว
                                        </Link>
                                    </Tab>
                                                        
                                </div>
                        ):(
                                <div>
                                    <Tab>
                                        <Link  to="/editAdmin/reviewAdmins/reviewAdmin1" style={{outline:'0', textDecoration: 'none',border:'none'}} onClick={() =>this.setIsActiveTabBar(1)}>
                                        ลบการรีวิว
                                        </Link>
                                    </Tab>
                                </div>
                        )
                    }
                    {this.state.checkActiveTabBar==2?
                        (
                                <div>
                                    <Tab  isActive>
                                        <Link  to="/editAdmin/reviewAdmins/reviewAdmin2" style={{outline:'0', textDecoration: 'none',border:'none'}} onClick={() =>this.setIsActiveTabBar(2)}>
                                        ปักหมุด
                                        </Link>
                                    </Tab>
                                                        
                                </div>
                        ):(
                                <div>
                                    <Tab>
                                        <Link  to="/editAdmin/reviewAdmins/reviewAdmin2" style={{outline:'0', textDecoration: 'none',border:'none'}} onClick={() =>this.setIsActiveTabBar(2)}>
                                        ปักหมุด
                                        </Link>
                                    </Tab>
                                </div>
                        )
                    }
                 
                   
               
                    
                        
                    </TabGroup>
                </Tabs>
               

    </div>
        );}
    }
}

export default tapMenuReviewAdmin;
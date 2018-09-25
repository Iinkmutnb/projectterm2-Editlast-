import React, { Component } from 'react';
import {Menu} from 're-bulma';
import {Textarea,Button,Modal,Content,Table,Tr,Th,Thead,Tbody,Td} from 're-bulma';
import cookie from 'react-cookies';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import queryString from 'query-string';
import {Link} from 'react-router-dom';

class reviewAdmin2 extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
       
      
        userType:'',
        id_buy_product:'',
        id_connect:'',
        date_sent:'',
        connect:'',
        date: date,
        check:1,
        review:'',
        checkSuccess:'',
        isopen:'',
        
        openDelete:'',
        id_review:'',
        topic:'',
        review_pukmud:[],

                        }
       
    }
    
    componentDidMount() {
        
        this.props.setExact(true,true,2);
    }
   
    componentWillMount() {
        console.log(this.props.match.params.id)
        this.props.setExact(true,true,2);
        var userType= cookie.load('userType');
        this.setState({userType:userType});

       fetch('http://localhost:9000/selectReview', {
            headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
            
                    },
        
            method: "POST",
            body:  queryString.stringify({'id':1})
    
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
         this.setState({review:data})
         var review_pukmud =data.filter((reviews,key)=>{return reviews.save_puk_mud=="pukmud"});
                
                
                
                    
                   
        this.setState({review_pukmud:review_pukmud})

        })
       
        
        
    }
    updateReview1=(topic,id_review)=>{
        
        this.setState({topic:topic,openDelete:true,id_review:id_review})  
    }
    setCloserModal=()=>{
        window.location.reload();
    }
    updateReview2=()=>{
        
        fetch('http://localhost:9000/updateReview', {
            headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
            
                    },
        
            method: "POST",
            body:  queryString.stringify({'id_review':this.state.id_review})
    
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          var check=true;
          if(data.qreury==false){check=false}
          if(check){
          this.setState({checkSuccess:1});
        }
        else{
            this.setState({checkSuccess:2});
        }
         this.setState({isOpen:true,openDelete:false})
         
    
    
    
    
        
        })  
    }

  


    render() {
      
        
      if(this.state.userType=="admin"||this.state.userType=="officer"){
        return (
            <div >
                <table>
                    <tr><td>&nbsp;</td></tr>
                    <tr><td style={{color:'grey',fontSize: '30px'}}>หัวข้อที่ปักหมุด</td></tr>
                </table>
       
     <Table style={{marginTop:'0px'}}>
                    <Thead>
                        <Tr>
                        <Th></Th>
                  <Th>หัวข้อ</Th>
                  <Th>ดูรายละเอียด</Th> 
                        
                        
                        </Tr>
                    </Thead>
                   
                    {this.state.review_pukmud!=''?( <Tbody style={{color:'grey'}}>
                    {
    this.state.review_pukmud.map((review,key) => 
    
        <Tr>
        <Td><b>{key+1}</b></Td>
        <Td><b>{review.topic}</b></Td>
       
        <Td>ปักมุดแล้ว</Td>
     
        </Tr>
        
 
 )}</Tbody>):(<Tbody></Tbody>)}
     
                    
              
              </Table>
            
              <hr style={{height:'3px', border:'none', color:'rgb(60,90,180)', backgroundColor:'rgb(60,90,180)'}}/>

              <table>
                    <tr><td>&nbsp;</td></tr>
                    <tr><td style={{color:'grey',fontSize: '30px'}}>หัวข้อทุกข้อ</td></tr>
                </table>

        <Table style={{marginTop:'0px'}}>
                    <Thead>
                        <Tr>
                        <Th></Th>
                  <Th>หัวข้อ</Th>
                  <Th></Th> 
                        
                        
                        </Tr>
                    </Thead>
                   
                    {this.state.review!=''?( <Tbody style={{color:'grey'}}>
                    {
    this.state.review.map((review,key) => 
    
        <Tr>
        <Td><b>{key+1}</b></Td>
        <Td><b>{review.topic}</b></Td>
       
        <Td>{review.save_puk_mud!='pukmud'?(<Button color="isWarning" style={{padding:'0px'}} onClick={()=>this.updateReview1(review.topic,review.id_review)}>&nbsp;ปักหมุด&nbsp;</Button>):(<b>ปักมุดแล้ว</b>)}</Td>
     
        </Tr>
        
 
 )}</Tbody>):(<Tbody></Tbody>)}
     
                    
              
              </Table>
              <Modal
                        type="card"
                        headerContent={<center>ยืนยันการปักหมุด</center>}
                        footerContent={<div style={{ padding: '20px'}} ></div>}
                        isActive={this.state.openDelete}
                        onCloseRequest={ () => this.setState({ openDelete: false })}
                        >
                        <Content>
                            <center>
                            <table><tr><td><div>หัวข้อ&nbsp;:&nbsp;{this.state.topic}</div></td></tr></table>
                       <table>
                           <tr>
                       <td> <Button color="isDanger" style={{padding:'0px'}} onClick={()=>this.updateReview2()}>&nbsp;ใช่&nbsp;</Button></td>
                       <td>&nbsp;</td>
                       <td> <Button color="isWarning" style={{padding:'0px'}} onClick={()=>this.setState({openDelete:false})}>&nbsp;ไม่ใช่&nbsp;</Button></td>
                            </tr>
                        </table>
                            </center>
                        </Content>
                        </Modal>
              {this.state.checkSuccess==0?(<div></div>)
                :(<div>
                    {this.state.checkSuccess==1?
                    (<div>
                        <Modal
                        type="card"
                        headerContent=""
                        footerContent={<div style={{ padding: '20px'}} ></div>}
                        isActive={this.state.isOpen}
                        onCloseRequest={() => this.setCloserModal()}
                        >
                        <Content>
                        ปักกหมุดเรียบร้อย
                        </Content>
                        </Modal>

                    </div>):
                    (<div>
                        <Modal
                        type="card"
                        headerContent=""
                        footerContent={<div style={{ padding: '20px'}} ></div>}
                        isActive={this.state.isOpen}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        >
                        <Content>
                        เกิดข้อผิดพลาด กรุณาปักกหมุดใหม่
                        </Content>
                        </Modal>
                    </div>)
                    }
                 </div>)
                }


            </div>
            
        );}
    }
}

export default reviewAdmin2;
//{ this.props.match.params.id}

/*
        <div style={{marginTop:'40px',marginLeft:'25px'}}>
              
             
                <Table style={{marginTop:'0px'}}>
                    <Thead>
                        <Tr>
                        <Th></Th>
                        <Th>รหัสสั่งซื้อ</Th>
                        <Th>วันที่ส่ง(ปี-เดือน-วัน)</Th>
                        <Th>ตอบกลับ</Th>
                        
                        
                        </Tr>
                    </Thead>
                   
                    {this.state.connect!=''?( <Tbody style={{color:'grey'}}>
                    {
    this.state.connect.map((connect,key) => 
    
        <Tr>
        <Td><b>{key+1}</b></Td>
        <Td><b>{connect.id_buy_product}</b></Td>
        <Td><b>{this.state.date}</b></Td>
        <Td><Button color="isWarning" style={{padding:'0px'}}><Link to={`/editAdmin/connectAdmins/connectAdminBack${connect.idconnect}`}  style={{padding:'7px',textDecoration:'none'}}>ตอบกลับ</Link></Button></Td>
        </Tr>
        
 
 )}</Tbody>):(<Tbody></Tbody>)}
     
                    
              
              </Table>
              </div>
*/
//<Button color="isWarning" style={{padding:'0px'}}><Link to={`/editAdmin/reviewAdmins/reviewAdmin3${review.id_review}`} style={{padding:'7px',textDecoration:'none'}}>เรียกดู</Link></Button>
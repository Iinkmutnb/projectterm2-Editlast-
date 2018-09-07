import React, { Component } from 'react';

import {  Columns ,Column,Notification,Group,Button,Modal,Content} from 're-bulma';
import cookie from 'react-cookies';
import queryString from 'query-string';
import {BrowserRouter,Link,Route} from 'react-router-dom';
import '../css/login/bootstrap.min.css';


class uploadPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailpayment:[],
      file:'',
      imagePreviewUrl:'',
      id_buy_product:'',
      price_transfer_accept_paymentcol:'',
      time_transfer_accept_paymentcol:'',
      phone_number:'',
      picture_payment:'',
      checkNull:1,
      isOpen:false
     
    };
   
   
  }
    componentWillMount() {
    this.props.setExact(false,true);
    this.setState({id_buy_product:this.props.match.params.id})
    /*
    var userid= cookie.load('userId');

    fetch('http://localhost:9000/detailPayment', {
        headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
        
                },
    
        method: "POST",
        body:  queryString.stringify({'user':userid})

    })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data)
      this.setState({detailpayment:data})
    })
*/    

                      }
                      setIsopen=()=>{
                        window.location.href='/payment'
                      }
 setImage=(e)=>{
                        var reader = new FileReader();
                        var file = e.target.files[0];
                   
                        reader.onloadend = () => {
                            this.setState({
                              file: file,
                              imagePreviewUrl: reader.result
                            });
                          }
                      
                          reader.readAsDataURL(file)
                        
                        
                    }
      insertData=()=> {
      
       /* imagePreviewUrl:'',
        id_buy_product:'',
        price_transfer_accept_paymentcol:'',
        time_transfer_accept_paymentcol:'',
        phone_number:'',
        picture_payment:'',*/
        var checkNull=1;
        if(this.state.price_transfer_accept_paymentcol==''){checkNull=2;this.setState({checkNull:2})}
        else if(this.state.time_transfer_accept_paymentcol==""){checkNull=2;this.setState({checkNull:2})}
        else if(this.state.phone_number==""){checkNull=2;this.setState({checkNull:2})}
       
        else if(this.state.file==""){checkNull=2;this.setState({checkNull:2})}
        else if(this.state.imagePreviewUrl==""){checkNull=2;this.setState({checkNull:2})}
        else{checkNull=1;this.setState({checkNull:1})}
       
        if(checkNull==1){
        
          
          fetch('http://localhost:9000/insertAceptpayment', {
            headers: {
                      'Content-Type':'application/x-www-form-urlencoded'
          
                     },
         
         
             method: "POST",                  
             body:  queryString.stringify({'id':this.state.id_buy_product,'price':this.state.price_transfer_accept_paymentcol,'phone':this.state.phone_number,'file':this.state.file.name,'time':this.state.time_transfer_accept_paymentcol})
            
           
         })
         .then((response) => response.json())
         .then((data) => { console.log(JSON.stringify(data));
         
         
          if(data.qreury){
            this.setState({isOpen:true})
            return new Promise((resolve, reject) => {
                let imageFormData = new FormData();
            
                imageFormData.append('file',this.state.file);
                imageFormData.append('imagePreviewUrl', this.state.imagePreviewUrl);
                
                var xhr = new XMLHttpRequest();
                
                xhr.open('post','http://localhost:9000/uploadImagePayment', true);
                
                xhr.onload = function () {
                    if (this.status == 200) {
                    resolve(this.response);
                    } else {
                    reject(this.statusText);
                    }
                };
                
                xhr.send(imageFormData);
  
            });
          }

         })
         .catch(function(error) {console.log( error.message);});
        }

      }

  render() {
    
    var userType= cookie.load('userType');
 
  if(userType=='customer'){
    
    return (
      
      <div className='border bg-dark text-white' style={{padding:'10px',width:'75%'}} >
          <form>
  <div className="form-group">
  <p className="h3">รหัสสั่งของ {this.state.id_buy_product}</p>
   
  </div>
  <div className="form-group">
    <label >จำนวนเงินที่โอน</label>
    <input onChange={(e)=>this.setState({price_transfer_accept_paymentcol:e.target.value})} type="number" className="form-control"  min="0" placeholder="ใส่จำนวนเงินที่โอน" style={{width:'25%'}}/>
  </div>
  <div className="form-group">
    <label >จำนวนวันเงินที่โอน</label>
    <input onChange={(e)=>this.setState({time_transfer_accept_paymentcol:e.target.value})} type="number" className="form-control" min="1" step={1}  placeholder="ใส่เวลาที่โอน" style={{width:'25%'}}/>

  </div>
  <div className="form-group">
    <label >เบอร์โทรศัพท์</label>
    <input onChange={(e)=>this.setState({phone_number:e.target.value})} type="number" className="form-control" min="1" step={1}  placeholder="ใส่เวลาที่โอน" style={{width:'25%'}}/>

  </div>

  <div  className="form-group">
  <input type="file"  id="exampleInputFile" aria-describedby="fileHelp"  onChange={(e)=>{this.setImage(e)}} />
 
    

</div>

  
  
</form>
<button onClick={()=>this.insertData()} type="submit" className="btn btn-primary">ยืนยัน</button>    
    
  

<Modal
                        type="card"
                        headerContent=""
                        footerContent={<div style={{ padding: '20px'}} ></div>}
                        isActive={this.state.isOpen}
                        onCloseRequest={() => this.setIsopen()}
                        >
                        <Content>
                        ส่งการแจ้งชำระเรียบร้อย
                        </Content>
                        </Modal>

      </div>
    );
  }else{
    return (<div>ยังไม่ได้ล็อกอิน</div>)

  }
  }
}

export default uploadPayment;
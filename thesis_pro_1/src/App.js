import React, { Component } from 'react';
import HOME from './home/home';
import './App.css';
import insertCss from 'insert-css';
import css from 're-bulma/build/css';
import {BrowserRouter,Link,Route,Match} from 'react-router-dom';
import {  Columns ,Column} from 're-bulma';
import PRODUCT from './home/product.js';
import EDIT_ADMIN from './home/editAdmin.js';
import MENU_SIDE from  '././home/head/menuSide.js';
import TAP_MENU from  './home/head/tapMenu.js';
import LOGO from  './home/head/logo.js';
import SLIDE from  './home/head/slide.js';
import LOGIN from  './home/head/login.js';
import REGISTER from './home/head/register.js';
import BUTTON_FACE_LINE from  './home/head/buttonFaceLine.js';
import INSERT_PRODUCT_ADMIN from './home/editAdmin/insert.js';
import MENU_SIDE_ADMIN from './home/editAdmin/menuSide.js';
import TAP_MENU_PRODUCT_ADMIN from './home/editAdmin/tapMenuProduct.js';
import EDIT_PRODUCT_ADMIN from './home/editAdmin/edit.js';
import EDITS_PRODUCT_ADMIN from './home/editAdmin/edits.js';
import DELETE_PRODUCT_ADMIN from './home/editAdmin/deleteProduct.js';
import TAP_MENU_OFFICER_ADMIN from './home/editAdmin/tapMenuOfficer.js';
import INSERT_OFFICER_ADMIN from './home/editAdmin/insertOfficer.js';
import EDIT_OFFICER_ADMIN from './home/editAdmin/editOfficer.js';
import EDITS_OFFICER_ADMIN from './home/editAdmin/editsOfficer.js';
import DELETE_OFFICER_ADMIN from './home/editAdmin/deleteOfficer.js';
import CHAGE_STATUS_PRODUCT from './home/editAdmin/chageStatusProduct.js';
import CHAGE_STATUS_CUSTOMER from './home/editAdmin/chageStatusCustomer.js';
import DETAIL_BUY_PRODUCT from './home/editAdmin/detailBuyProduct.js';
import DETAIL_BUY_PRODUCTS from './home/editAdmin/detailBuyProducts.js';
import PRODUCT_PRO from './home/productPro.js';
import PRODUCT_ALL from './home/productAll.js';
import DETAIL_CUSTOMER from './home/detaliCustomer.js';
import EDIT_CUSTOMER from './home/editCustomer.js';
import PAGE_LINE from './home/pageLine.js';
import PAGE_BASKET from './home/pageBasket/pageBasket.js'
import PAGE_BASKET1 from './home/pageBasket/pageBasket1.js'
import PAGE_BASKET2 from './home/pageBasket/pageBasket2.js'

import DETAIL_PRODUCT_PROMOION from './home/pageProductPromotion/detailProductPromotion.js';
import ADD_DETAIL_PRODUCT_PROMOTION from './home/pageProductPromotion/addDetailProductPromotion.js';
import EDIT_DETAIL_PRODUCT_PROMOTION from './home/pageProductPromotion/editDetailProductPromotion.js';
import SHOW_PROMOTION_IN_HOME from './home/home/showPromotionInHome.js';
import SHOW_All_PRODUCT_IN_HOME from './home/home/showAllProductInhome.js';
import ALL_PAYMENT from './home/payment/allPaymet.js';
import UPLOAD_PAYMENT from './home/payment/uploadPayment.js';
import ACCEPT_PAYMENT from './home/payment/acceptPayment.js';
import DETAIL_PAYMENT from './home/payment/detailPayment.js';
import queryString from 'query-string';
import './home/css/login/bootstrap.min.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exact:false,
      exactProdcut:false,
      page:1,
      errorPage: false,
      
    };
    
  }
  componentWillMount() {
    
    insertCss(css, { prepend: true });
  
    if(window.location.pathname=="/"){
      this.setState({exact:false})
      this.setState({page:1})
      console.log("goodbye")
    }
    if(window.location.pathname=="/register"){
      this.setState({exact:true})
    }
   /* if(window.location.pathname=="/editAdmin/product/insert"){
      this.setState({exact:true,exactProdcut:true,page:2})
    }*/

    fetch('http://localhost:9000/s', {
      headers: {
                'Content-Type':'application/x-www-form-urlencoded'
    
               },
   
   
       method: "POST",
       body:  queryString.stringify({'name':'*'})
      
     
   })
   .then((response) => response.json())
   .then((data) => {//console.log(JSON.stringify(data))
   console.log(data)
    })



    
  }
  componentDidCatch(error, info) {
    // Display fallback UI
 
    // You can also log the error to an error reporting service
    this.setState({ errorPage:true });
  }
 setExact=(value,value2,page)=>{
   if(page==undefined){
   page=1
   }
 
  this.setState({exact:value,exactProdcut:value2,page:page})
  console.log("page+++"+page)
  if(page!=undefined){
    //window.location.reload();
    }
  //window.location.reload();
 }

  render() {
    console.log("pages:"+this.state.page)
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>กรุณากดรีเฟรช refresh</h1>;
    }
    if(this.state.page==1){
      return (
        <div  >
        <BrowserRouter >
       <div>
         <table style={{width:'100%'}}>
           <tr style={{padding:'0px',marginButtom:'0 px',border:'1px solid #C8C8C8',background:'linear-gradient(to bottom, #bfbfbf 0%, #ffffff 100%)',width:'100%'}} ><td colSpan={2}>     <Route path='/'  exact={this.state.exact} render={(props) => <SLIDE  setExact={this.setExact}/>} /></td></tr>
           <tr ><td style={{paddingTop:'0px',padingBottom:'0px', verticalAlign:'top' }}  rowSpan={2} ><Route path='/'  exact={this.state.exact}  component={MENU_SIDE} /></td>
           <td style={{height:'1px'}}>
           <Route path='/' exact={this.state.exact}   render={(props) => <TAP_MENU setExact={this.setExact}/>}   />
           

           </td>
           </tr>
           <tr ><td style={{paddingTop:'20px',paddingLeft:'5%', verticalAlign:'top' }} >
             
           <Route path='/product'  render={(props) => <SHOW_PROMOTION_IN_HOME setExact={this.setExact}/>}  />
                 <Route path='/'   exact={this.state.exactProdcut} render={(props) => <SHOW_PROMOTION_IN_HOME setExact={this.setExact}/>}  />
                 <Route path='/product'  render={(props) => <SHOW_All_PRODUCT_IN_HOME setExact={this.setExact}/>}  />
                 <Route path='/'   exact={this.state.exactProdcut} render={(props) => <SHOW_All_PRODUCT_IN_HOME setExact={this.setExact}/>}  />
                 
                 <Route path='/productPro'  render={(props) => <PRODUCT_PRO  setExact={this.setExact}/>}  /> 
                 <Route path='/pageLine'  render={(props) => <PAGE_LINE setExact={this.setExact}/>}  />
                 <Route path='/pageBasket'  render={(props) => <PAGE_BASKET setExact={this.setExact}/>}  />
                 <Route path='/productAll:type'  render={(props) => <PRODUCT_ALL {...props} setExact={this.setExact}/>}  />  
                 <Route path='/register'   render={(props) => <REGISTER setExact={this.setExact}/>} />
                 <Route path='/detaliCustomer'   render={(props) => <DETAIL_CUSTOMER setExact={this.setExact}/>} />
                 <Route path='/editCustomer'   render={(props) => <EDIT_CUSTOMER setExact={this.setExact}/>} />
                 <Route path='/editAdmin'   render={(props) => <EDIT_ADMIN setExact={this.setExact}/>} />
                 <Route path='/editAdmin/product'   render={(props) => <TAP_MENU_PRODUCT_ADMIN setExact={this.setExact}/>} />
                 <Route path='/editAdmin/product/insert'   render={(props) => <INSERT_PRODUCT_ADMIN setExact={this.setExact}/>} />
                 <Route path='/editAdmin/product/edit'   render={(props) => <EDIT_PRODUCT_ADMIN setExact={this.setExact}/>} />
                 <Route path='/editAdmin/product/delete'   render={(props) => <DELETE_PRODUCT_ADMIN setExact={this.setExact}/>} />
                 <Route path='/editAdmin/product/edits:code'   render={(props) => <EDITS_PRODUCT_ADMIN {...props}  setExact={this.setExact}/>} />
                 <Route path='/editAdmin/detailBuyProduct'   render={(props) => <DETAIL_BUY_PRODUCT setExact={this.setExact}/>} />
                 <Route path='/editAdmin/detailBuyProducts:id'   render={(props) => <DETAIL_BUY_PRODUCTS {...props}  setExact={this.setExact}/>} />
                 <Route path='/editAdmin/officer'   render={(props) => <TAP_MENU_OFFICER_ADMIN setExact={this.setExact}/>} />
                 <Route path='/editAdmin/officer/insertOfficer'   render={(props) => <INSERT_OFFICER_ADMIN setExact={this.setExact}/>} />
                         <Route path='/editAdmin/officer/editOfficer'   render={(props) => <EDIT_OFFICER_ADMIN setExact={this.setExact}/>} />
                         
                         <Route path='/editAdmin/officer/deleteOfficer'   render={(props) => <DELETE_OFFICER_ADMIN  setExact={this.setExact}/>} />
                                       <Route path='/editAdmin/officer/editsOfficer:code'   render={(props) => <EDITS_OFFICER_ADMIN {...props}   setExact={this.setExact}/>} />                
                         <Route path='/editAdmin/productPromotion'   render={(props) => <DETAIL_PRODUCT_PROMOION    setExact={this.setExact}/>} />   
                         <Route path='/editAdmin/addDetailProductPromotion'   render={(props) => <ADD_DETAIL_PRODUCT_PROMOTION    setExact={this.setExact}/>} />
                         <Route path='/editAdmin/editDetailProductPromotion:id'   render={(props) => < EDIT_DETAIL_PRODUCT_PROMOTION   {...props} setExact={this.setExact}/>} />     
                        
                 <Route path='/payment'  render={(props) => <ALL_PAYMENT  setExact={this.setExact}/>}  /> 
                 <Route path='/uploadPayment:id'   render={(props) => < UPLOAD_PAYMENT   {...props} setExact={this.setExact}/>} /> 
                 <Route path='/acceptPayment:id'   render={(props) => < ACCEPT_PAYMENT   {...props} setExact={this.setExact}/>} />     
                 <Route path='/detailPayment:id'   render={(props) => < DETAIL_PAYMENT   {...props} setExact={this.setExact}/>} /> 
                        
             </td></tr>
           <tr><td colSpan={2}><Route path='/' exact={this.state.exact}   component={BUTTON_FACE_LINE}/></td></tr>
           </table>
   
                 
                
          
           
          </div>
           </BrowserRouter >
        </div>

      );

    }
    else if(this.state.page==2){
      return (
        <div className="bg-secondary">
         
         <BrowserRouter >
         <div>
         
        <Route path='/' exact={this.state.exact}  render={(props) => <LOGIN setExact={this.setExact}/>} />
        <Route path='/'  exact={this.state.exact} component={LOGO}/>
        <Route path='/'  exact={this.state.exact} render={(props) => <SLIDE  setExact={this.setExact}/>}/>
        
        <Route path='/' exact={this.state.exact}  component={MENU_SIDE}/>
        <Route path='/' exact={this.state.exact}   component={TAP_MENU}/>
        <Route path='/' exact={this.state.exact}   component={BUTTON_FACE_LINE}/>
        <Route path='/product'  render={(props) => <PRODUCT setExact={this.setExact}/>}  />
        <Route path='/register'   render={(props) => <REGISTER setExact={this.setExact}/>} />
        <Route path='/detaliCustomer'   render={(props) => <DETAIL_CUSTOMER setExact={this.setExact}/>} />
        <Route path='/editCustomer'   render={(props) => <EDIT_CUSTOMER setExact={this.setExact}/>} />
        <Route path='/productPro'  render={(props) => <PRODUCT_PRO setExact={this.setExact}/>}  />
        <Route path='/pageLine'  render={(props) => <PAGE_LINE setExact={this.setExact}/>}  />
         <Route path='/pageBasket'  render={(props) => <PAGE_BASKET setExact={this.setExact}/>}  />
        <Route path='/productAll:type'  render={(props) => <PRODUCT_ALL {...props} setExact={this.setExact}/>}  />  
        <Route path='/editAdmin'   render={(props) => <EDIT_ADMIN setExact={this.setExact}/>} />
        <Columns style={{background:'white'}}>
                    <Column size="is2" style={{width:'260px'}}>
                    <Route path='/editAdmin'   render={(props) => <MENU_SIDE_ADMIN setExact={this.setExact}/>} />
                    </Column>
                    <Column >
                   
                      <Column  style={{padding:'10px 1px 0px 5px' }}>
                      <Route path='/editAdmin/product'    render={(props) => <TAP_MENU_PRODUCT_ADMIN setExact={this.setExact}/>} />
                      <Route path='/editAdmin/officer'   render={(props) => <TAP_MENU_OFFICER_ADMIN setExact={this.setExact}/>} />
                      <Route path='/editAdmin/detailBuyProduct'   render={(props) => <DETAIL_BUY_PRODUCT setExact={this.setExact}/>} />
                      <Route path='/editAdmin/detailBuyProducts:id'   render={(props) => <DETAIL_BUY_PRODUCTS {...props}  setExact={this.setExact}/>} />
                      </Column>
                      <Column style={{marginTop:'0px',padding:'0px 1px 1px 5px'}}>
                     
                        <Route path='/editAdmin/product/insert'   render={(props) => <INSERT_PRODUCT_ADMIN setExact={this.setExact}/>} />
                        <Route path='/editAdmin/product/edit'   render={(props) => <EDIT_PRODUCT_ADMIN setExact={this.setExact}/>} />
                        <Route path='/editAdmin/product/delete'   render={(props) => <DELETE_PRODUCT_ADMIN setExact={this.setExact}/>} />
                        <Route path='/editAdmin/product/edits:code'   render={(props) => <EDITS_PRODUCT_ADMIN {...props}  setExact={this.setExact}/>} />
                        <Route path='/editAdmin/product/chageStatusProduct'   render={(props) => <CHAGE_STATUS_PRODUCT setExact={this.setExact}/>} />
                        
                        <Route path='/editAdmin/officer/insertOfficer'   render={(props) => <INSERT_OFFICER_ADMIN setExact={this.setExact}/>} />
                        <Route path='/editAdmin/officer/editOfficer'   render={(props) => <EDIT_OFFICER_ADMIN setExact={this.setExact}/>} />
                        
                        <Route path='/editAdmin/officer/deleteOfficer'   render={(props) => <DELETE_OFFICER_ADMIN  setExact={this.setExact}/>} />
                        <Route path='/editAdmin/officer/editsOfficer:code'   render={(props) => <EDITS_OFFICER_ADMIN {...props}  setExact={this.setExact}/>} />
                        <Route path='/editAdmin/officer/chageStatusCustomer'   render={(props) => <CHAGE_STATUS_CUSTOMER setExact={this.setExact}/>} />
                        
                        <Route path='/editAdmin/productPromotion'   render={(props) => <DETAIL_PRODUCT_PROMOION {...props}   setExact={this.setExact}/>} />  
                        <Route path='/editAdmin/addDetailProductPromotion'   render={(props) => <ADD_DETAIL_PRODUCT_PROMOTION    setExact={this.setExact}/>} />
                        <Route path='/editAdmin/editDetailProductPromotion:id'   render={(props) => < EDIT_DETAIL_PRODUCT_PROMOTION   {...props} setExact={this.setExact}/>} />   
                      </Column>
                    </Column>
                   
        </Columns>
        </div>
        </BrowserRouter >
       </div>
      );
    }
  else if(this.state.page==3){ return (<div className="bg-secondary">
          <BrowserRouter >
          <div>
           
          <Route path='/' exact={this.state.exact}  render={(props) => <LOGIN setExact={this.setExact}/>} />
        <Route path='/'  exact={this.state.exact} component={LOGO}/>
        <Route path='/'  exact={this.state.exact}  render={(props) => <SLIDE  setExact={this.setExact}/>}/>
        
        <Route path='/' exact={this.state.exact}  component={MENU_SIDE}/>
        <Route path='/' exact={this.state.exact}   component={TAP_MENU}/>
        <Route path='/' exact={this.state.exact}   component={BUTTON_FACE_LINE}/>



        
     
        <table  style={{padding:'0px',marginButtom:'0 px',border:'1px solid #C8C8C8',background:'linear-gradient(to bottom, #bfbfbf 0%, #ffffff 100%)',width:'100%'}}>
        <tr>
             <td style={{width:'45%'}}></td>
             <td>  
             <Route path='/pageBasket'  render={(props) => <PAGE_BASKET setExact={this.setExact}/>}  />
             </td>
        </tr>
        </table>
          <Route path='/pageBasket/pageBasket1'  render={(props) => <PAGE_BASKET1 setExact={this.setExact}/>}  />
          <Route path='/pageBasket/pageBasket2'  render={(props) => <PAGE_BASKET2 setExact={this.setExact}/>}  />
      </div>
      </BrowserRouter >
   
    </div>)}

  
  }
}

export default App;

/*
 <table  style={this.state.exact ? ({}):({padding:'0px',marginButtom:'0 px',border:'1px solid #C8C8C8',background:'linear-gradient(to bottom, #bfbfbf 0%, #ffffff 100%)',width:'100%'})}>
             <tr>
             <td style={{width:'45%'}}>
               
               <Route path='/'  exact={this.state.exact} component={LOGO}/>
             </td>

             <td >
               <Route path='/'  exact={this.state.exact} render={(props) => <SLIDE  setExact={this.setExact}/>} />
             </td>
             </tr>
           </table>
       
           <table style={{marginTop:'0px',padding:'0px',width:'100%'}} >
           <tr  >
             <td style={{width: '20%',verticalAlign: 'top'}} >
            
              
              
                 <Route path='/' exact={this.state.exact}  component={MENU_SIDE} />
                     
           
          
             </td>
         
             <td    >
             
                 <div style={{ position: 'sticky', top:'0px',zIndex: '99'}}>
                 <Route path='/' exact={this.state.exact}   render={(props) => <TAP_MENU setExact={this.setExact}/>}   />
                 </div>
              
             
               <tr  context="isChild" >
               <td style={{textAlignVertical: "center",textAlign: "center",border:'1px solid'}}>
                
                 <Route path='/product'  render={(props) => <SHOW_PROMOTION_IN_HOME setExact={this.setExact}/>}  />
                 <Route path='/'   exact={this.state.exactProdcut} render={(props) => <SHOW_PROMOTION_IN_HOME setExact={this.setExact}/>}  />
                 <Route path='/product'  render={(props) => <SHOW_All_PRODUCT_IN_HOME setExact={this.setExact}/>}  />
                 <Route path='/'   exact={this.state.exactProdcut} render={(props) => <SHOW_All_PRODUCT_IN_HOME setExact={this.setExact}/>}  />
                 
                 <Route path='/productPro'  render={(props) => <PRODUCT_PRO  setExact={this.setExact}/>}  /> 
                 <Route path='/pageLine'  render={(props) => <PAGE_LINE setExact={this.setExact}/>}  />
                 <Route path='/pageBasket'  render={(props) => <PAGE_BASKET setExact={this.setExact}/>}  />
                 <Route path='/productAll:type'  render={(props) => <PRODUCT_ALL {...props} setExact={this.setExact}/>}  />  
                 <Route path='/register'   render={(props) => <REGISTER setExact={this.setExact}/>} />
                 <Route path='/detaliCustomer'   render={(props) => <DETAIL_CUSTOMER setExact={this.setExact}/>} />
                 <Route path='/editCustomer'   render={(props) => <EDIT_CUSTOMER setExact={this.setExact}/>} />
                 <Route path='/editAdmin'   render={(props) => <EDIT_ADMIN setExact={this.setExact}/>} />
                 <Route path='/editAdmin/product'   render={(props) => <TAP_MENU_PRODUCT_ADMIN setExact={this.setExact}/>} />
                 <Route path='/editAdmin/product/insert'   render={(props) => <INSERT_PRODUCT_ADMIN setExact={this.setExact}/>} />
                 <Route path='/editAdmin/product/edit'   render={(props) => <EDIT_PRODUCT_ADMIN setExact={this.setExact}/>} />
                 <Route path='/editAdmin/product/delete'   render={(props) => <DELETE_PRODUCT_ADMIN setExact={this.setExact}/>} />
                 <Route path='/editAdmin/product/edits:code'   render={(props) => <EDITS_PRODUCT_ADMIN {...props}  setExact={this.setExact}/>} />
                 <Route path='/editAdmin/detailBuyProduct'   render={(props) => <DETAIL_BUY_PRODUCT setExact={this.setExact}/>} />
                 <Route path='/editAdmin/detailBuyProducts:id'   render={(props) => <DETAIL_BUY_PRODUCTS {...props}  setExact={this.setExact}/>} />
                 <Route path='/editAdmin/officer'   render={(props) => <TAP_MENU_OFFICER_ADMIN setExact={this.setExact}/>} />
                 <Route path='/editAdmin/officer/insertOfficer'   render={(props) => <INSERT_OFFICER_ADMIN setExact={this.setExact}/>} />
                         <Route path='/editAdmin/officer/editOfficer'   render={(props) => <EDIT_OFFICER_ADMIN setExact={this.setExact}/>} />
                         
                         <Route path='/editAdmin/officer/deleteOfficer'   render={(props) => <DELETE_OFFICER_ADMIN  setExact={this.setExact}/>} />
                                       <Route path='/editAdmin/officer/editsOfficer:code'   render={(props) => <EDITS_OFFICER_ADMIN {...props}   setExact={this.setExact}/>} />                
                         <Route path='/editAdmin/productPromotion'   render={(props) => <DETAIL_PRODUCT_PROMOION    setExact={this.setExact}/>} />   
                         <Route path='/editAdmin/addDetailProductPromotion'   render={(props) => <ADD_DETAIL_PRODUCT_PROMOTION    setExact={this.setExact}/>} />
                         <Route path='/editAdmin/editDetailProductPromotion:id'   render={(props) => < EDIT_DETAIL_PRODUCT_PROMOTION   {...props} setExact={this.setExact}/>} />     
                        
                 <Route path='/payment'  render={(props) => <ALL_PAYMENT  setExact={this.setExact}/>}  /> 
                 <Route path='/uploadPayment:id'   render={(props) => < UPLOAD_PAYMENT   {...props} setExact={this.setExact}/>} />   
                        
                         
                           
                      </td>                
               </tr>
               <Column  context="isChild" > 
               <Route path='/' exact={this.state.exact}   component={BUTTON_FACE_LINE}/>
               </Column>
              
           
             </td>
        
            </tr>
           </table >
           

*/



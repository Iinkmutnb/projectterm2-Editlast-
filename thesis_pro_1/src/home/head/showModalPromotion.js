import React, { Component } from 'react';
import {  Columns ,Column,Modal,Content} from 're-bulma';

  
function showModalPromotion(props) {

 const data =props.dataModal.map((product) =><div>
          <Modal
          type="card"
          headerContent="รายละเอียดสินค้า"
          footerContent={<div style={{ padding: '20px'}} ></div> }
          isActive={props.showModal}
          onCloseRequest={() => props.setFalseShowModal()}
        >
          <Content>
            {    props.dataModal.map((product) =><div><Columns>
            <Column>
            <Columns><Column  style={{ fontWeight: 'bold'}}>ชื่อสินค้า : </Column> <Column>{product.name}</Column></Columns>
            <Columns><Column  style={{ fontWeight: 'bold'}}>ราคาสินค้า : </Column>  <Column>{product.Price}</Column> </Columns>
            <Columns><Column style={{ fontWeight: 'bold'}}>รายละเอียดต่าง ๆ :</Column> </Columns>
            <Columns><Column  >{product.Des}</Column> </Columns>
            <Columns><Column  style={{ fontWeight: 'bold'}}>รายละเอียดโปรโมชั่น:</Column> </Columns>
            <Columns><Column  >ลดราคา {product.promotion_discount} %</Column> </Columns>
            </Column> 
            <Column><img style={{marginLeft:'50px',border:'solid 1px',width:'220px',height:'250px',}} src={require('../../home/picture/product/'+product.Src)}/></Column> 
            </Columns>
    
    
                </div>)}
          </Content>
     
        </Modal>





 </div>)
 return <div>{data}</div>

}

export default showModalPromotion;
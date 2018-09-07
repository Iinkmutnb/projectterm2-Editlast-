var querys = require('./showProduct.js');
var showModal = require('./showModal.js');
var login = require('./login.js');
var checkUserPass=require('./checkUserPass.js');
var insertUser=require('./insertUser.js');
var insertImageProduct=require('./insertImageProduct.js');
var checkProduct=require('./checkProduct.js');
var insertProduct=require('./insertProduct.js');
var selectOneProduct=require('./selectOneProduct.js');
var checkEditProduct=require('./checkEditProduct.js');
var editProduct=require('./editProduct.js');
var editUploadImageProduct=require('./editUploadImageProduct.js');
var deleteProduct=require('./deleteProduct.js');
var showOffice=require('./showOffice.js');
var checkOfficer=require('./checkOfficer.js');
var insertOfficer=require('./insertOfficer.js');
var insertImageOfficer=require('./insertImageOfficer.js');
var selectOneOfficer=require('./selectOneOfficer.js');
var editOfficer=require('./editOfficer.js');
var editUploadImageOfficer=require('./editUploadImageOfficer.js');
var checkEditOfficer=require('./checkEditOfficer.js');
var deleteOfficer=require('./deleteOfficer.js');
var selectOneOfiicerFromUser=require('./selectOneOfiicerFromUser.js');
var chageStatusProduct=require('./pageEditAdmin/chageStatusProduct.js');
var chageStatusUser=require('./pageEditAdmin/chageStatusUser.js');
var showProductPro=require('./pageHome/showProductPro.js');
var detailCustomer=require('./pageHome/detailCustomer.js');
var checkUserCustomer=require('./pageHome/checkUserCustomer.js');
var editCustomer=require('./pageHome/editCustomer.js');
var checkEmail=require('./pageHome/checkEmail.js');
var checkUserFace=require('./pageHome/checkUserFace.js');
var selectBasket=require('./pageHome/selectBasket.js');
var inserBuyProduct=require('./pageBasket/inserBuyProduct.js');
var inserDetailBuyProduct=require('./pageBasket/inserDetailBuyProduct.js');  
var SelectBuyProduct=require('./pageEditAdminBuyProduct/SelectBuyProduct.js'); 
var selectDetailBuyProduct=require('./pageEditAdminBuyProduct/selectDetailBuyProduct.js');    
var detailProductPromotion=require('./pageProductPromotion/detailProductPromotion.js');  
var checkIdProduct=require('./pageProductPromotion/checkIdProduct.js');  
var checkProductPromotion=require('./pageProductPromotion/checkProductPromotion.js');  
var insertProductPromotion=require('./pageProductPromotion/insertProductPromotion.js'); 
var selectProductPromotion=require('./pageProductPromotion/selectProductPromotion.js'); 
var editDetailProductPromotion=require('./pageProductPromotion/editDetailProductPromotion.js');
var deleteDetailProductPromotion=require('./pageProductPromotion/deleteDetailProductPromotion.js'); 
var selectProdcutPromotionPageProductPro=require('./pageHome/selectProdcutPromotionPageProductPro.js');
var selectOneProdcutPromotionPageProductPro=require('./pageHome/selectOneProdcutPromotionPageProductPro.js');
var showPromotionInHome=require('./pageHome/showPromotionInHome.js');
var selectOneCustomer=require('./pageBasket/selectOneCustomer.js');
var detailPayment=require('./payMent/detailPayment.js');
var insertAceptpayment=require('./payMent/insertAceptpayment.js');
var uploadImagePayment=require('./payMent/uploadImagePayment.js');
var detailPaymentOfOfficer=require('./payMent/detailPaymentOfOfficer.js');
var acceptPayment=require('./payMent/acceptPayment.js');
var setAcceptPayment=require('./payMent/setAcceptPayment.js');
var insertCountDetailBuyProduct=require('./payMent/insertCountDetailBuyProduct.js');
var deleteDetailBuyProduct=require('./payMent/deleteDetailBuyProduct.js');
var deleteDetailBuyProductAll=require('./payMent/deleteDetailBuyProductAll.js');

module.exports={
    querys: function(name,res) {
        querys.querys(name,res);
    },
    showModal:function(code,res) {
        showModal.showModal(code,res);
    },
    login:function(user,pass,res) {
        login.login(user,pass,res);
    },
    checkUserPass:function(user,email,res) {
        checkUserPass.checkUserPass(user,email,res);
    },
    insertUser:function(user,pass,name,subName,email,phone,address,res) {
        insertUser.insertUser(user,pass,name,subName,email,phone,address,res);
    },
    insertImageProduct: function(req,res){
        insertImageProduct.insertImageProduct(req,res);

    },
    checkProduct: function(req,res,code,name,file){
       
        checkProduct.checkProduct(req,res,code,name,file);

    },
    insertProduct: function(req,res,code,name,price,file,definition,type){
        
        insertProduct.insertProduct(req,res,code,name,price,file,definition,type);
 
     },
     selectOneProduct: function(req,res,code){
        
        selectOneProduct.selectOneProduct(req,res,code);
 
     },
     checkEditProduct: function(req,res,codeOld,nameOld,srcOld,code,name,file){
        
        checkEditProduct.checkEditProduct(req,res,codeOld,nameOld,srcOld,code,name,file);
 
     }, 
     editProduct: function(req,res,codeOld,code,name,price,file,definition,type){
        
        editProduct.editProduct(req,res,codeOld,code,name,price,file,definition,type);
 
     },
     editUploadImageProduct: function(req,res){
        editUploadImageProduct.editUploadImageProduct(req,res);

    },
    deleteProduct: function(req,res,code,Src){
        deleteProduct.deleteProduct(req,res,code,Src);

    },
    showOffice: function(name,res){
        showOffice.showOffice(name,res);

    },
    checkOfficer: function(req,res,code,user,file){
        checkOfficer.checkOfficer(req,res,code,user,file);
    },
    insertOfficer: function(req,res,code,name,subname,file,address,user,pass){
        insertOfficer.insertOfficer(req,res,code,name,subname,file,address,user,pass)
    },
    insertImageOfficer: function(req,res){
        insertImageOfficer.insertImageOfficer(req,res);
    },
    selectOneOfficer: function(req,res,code) {
        selectOneOfficer.selectOneOfficer(req,res,code);
    },
    editOfficer: function(req,res,code,name,subname,file,address,user,pass){
        editOfficer.editOfficer(req,res,code,name,subname,file,address,user,pass);
    },
    editUploadImageOfficer: function(req,res) {
        editUploadImageOfficer.editUploadImageOfficer(req,res);
    },
    checkEditOfficer: function(req,res,userOld,srcOld,user,file) {
        checkEditOfficer.checkEditOfficer(req,res,userOld,srcOld,user,file) ;
    },
    deleteOfficer: function(req,res,code,Src) {
        deleteOfficer.deleteOfficer(req,res,code,Src);
    },
    selectOneOfiicerFromUser: function(req,res,user) {
        selectOneOfiicerFromUser.selectOneOfiicerFromUser(req,res,user);
    },
    chageStatusProduct: function(req,res,code,status) {
     
        chageStatusProduct.chageStatusProduct(req,res,code,status);
    },
    chageStatusUser: function(req,res,code,status) {
        
        chageStatusUser.chageStatusUser(req,res,code,status);
    },
    showProductPro: function(req,res) {
        
        showProductPro.showProductPro(req,res);
    },
    detailCustomer: function(req,res,userId) {
        
        detailCustomer.detailCustomer(req,res,userId);
    },
    checkUserCustomer: function(res,email,emailOld) {
        
        checkUserCustomer.checkUserCustomer(res,email,emailOld);
    },
    editCustomer: function(res,user,pass,name,subName,email,phone,address) {
        editCustomer.editCustomer(res,user,pass,name,subName,email,phone,address);
    },
    checkEmail: function(res,email){
        checkEmail.checkEmail(res,email);
    },
    checkUserFace:function(res,email){
        
        checkUserFace.checkUserFace(res,email);
    },
    selectBasket: function(res,takeBasket) {
        selectBasket.selectBasket(res,takeBasket);
    },
     inserBuyProduct: function(req,res,userBuy,userTypeBuy,count,price) {
        inserBuyProduct.inserBuyProduct(req,res,userBuy,userTypeBuy,count,price);
    },
     inserDetailBuyProduct: function(req,res,id,code,count) {
        inserDetailBuyProduct.inserDetailBuyProduct(req,res,id,code,count);
    },
     SelectBuyProduct: function(res) {
        SelectBuyProduct.SelectBuyProduct(res);
    },
     selectDetailBuyProduct: function(res,id) {
        selectDetailBuyProduct.selectDetailBuyProduct(res,id);
    },
     detailProductPromotion: function(res) {
        detailProductPromotion.detailProductPromotion(res);
    }, 
     checkIdProduct: function(res,idProduct) {
        checkIdProduct.checkIdProduct(res,idProduct);
    },
    checkProductPromotion: function(res,idProduct) {
        checkProductPromotion.checkProductPromotion(res,idProduct);
    },
    insertProductPromotion: function(res,idProduct,discount,start,end) {
        insertProductPromotion.insertProductPromotion(res,idProduct,discount,start,end);
    },      
    selectProductPromotion: function(res,id) {
        selectProductPromotion.selectProductPromotion(res,id);
    },     
    editDetailProductPromotion: function(res,idPromotion,idProduct,discount,start,end) {
            editDetailProductPromotion.editDetailProductPromotion(res,idPromotion,idProduct,discount,start,end);
    }, 
    deleteDetailProductPromotion: function(res,idPromotion) {
        deleteDetailProductPromotion.deleteDetailProductPromotion(res,idPromotion);
    },
        selectProdcutPromotionPageProductPro: function(res) {
            selectProdcutPromotionPageProductPro.selectProdcutPromotionPageProductPro(res);
    },
    selectOneProdcutPromotionPageProductPro: function(res,code) {
        
        selectOneProdcutPromotionPageProductPro.selectOneProdcutPromotionPageProductPro(res,code);
    },
    showPromotionInHome: function(res) {
        
        showPromotionInHome.showPromotionInHome(res);
    },
    selectOneCustomer: function(req,res,user) {
 
        selectOneCustomer.selectOneCustomer(req,res,user);
    },
    detailPayment: function(req,res,user) {
       
        detailPayment.detailPayment(req,res,user);
    },
    insertAceptpayment: function(req,res,id,price,time,phone,file) {
        
        insertAceptpayment.insertAceptpayment(req,res,id,price,time,phone,file)
     },
     uploadImagePayment: function(req,res) {
        
        uploadImagePayment.uploadImagePayment(req,res)
     },    
     detailPaymentOfOfficer: function(req,res) {
        
        detailPaymentOfOfficer.detailPaymentOfOfficer(req,res)
     },
     acceptPayment: function(req,res,id) {
        acceptPayment.acceptPayment(req,res,id)
     },
     setAcceptPayment: function(req,res,id) {
        setAcceptPayment.setAcceptPayment(req,res,id)
     },
     insertCountDetailBuyProduct: function(req,res,count_product,id_detail_buy_product) {
        insertCountDetailBuyProduct.insertCountDetailBuyProduct(req,res,count_product,id_detail_buy_product)
     },
     deleteDetailBuyProduct: function(req,res,id_detail_buy_product) {
            deleteDetailBuyProduct.deleteDetailBuyProduct(req,res,id_detail_buy_product)
    },  
        deleteDetailBuyProductAll: function(req,res,id) {
            deleteDetailBuyProductAll.deleteDetailBuyProductAll(req,res,id)
    }, 

}

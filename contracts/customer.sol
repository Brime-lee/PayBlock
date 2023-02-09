// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface IonBoarding  {
    function GetAllRegisteredCompany() external  view returns(string [] memory );
    function customerAddress() external   returns(address  [] calldata);
 
}
contract onBoarding{
    mapping (address=> string) public customerInfo;
    address []  public  customerAddress;
    string[] private companyNames;
   
    address owner =msg.sender;
    modifier onlyOwner(address _cusAddress){
        require(msg.sender==_cusAddress,"Invalid address");
        _;
    }
    modifier checkBalance(){
         require(msg.sender.balance>0,"You don't have a sufficient balance to perform this transaction" );
        _;
    }
    function onboardCustomers(string memory _name) checkBalance() public {
        customerInfo[msg.sender]=_name;
        customerAddress.push(msg.sender);
        companyNames.push(_name);

        
    }

    function GetAllRegisteredCompany() public  view returns(string [] memory ){
        string []  memory listOfCompanys=companyNames ;
        return listOfCompanys;
    }
   
    
}
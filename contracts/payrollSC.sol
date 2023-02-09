// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract SalaryPayment  {
   
   mapping (address => Employee) public employees;
   address payable [] employeesAddress;

   uint public salaryDate;
   

   struct Employee {
      uint salary;
      string name;
      address payable  wallet ;
      address companyAddress;
   }
   Employee [] listOfEmp;
   
    address owner =msg.sender;
    modifier onlyOwner(address _cusAddress){
        require(msg.sender==_cusAddress,"Invalid address");
        _;
    }
  

   
   
   function setSalaryDate(uint _salaryDate) onlyOwner(owner)   public {
      salaryDate = _salaryDate;
   }

   function addEmployee(string memory _name, address payable _wallet, uint _salary) onlyOwner(owner)  public {
   
      employees[_wallet] = Employee(_salary, _name, _wallet,msg.sender);
      employeesAddress.push(_wallet);
      listOfEmp.push(employees[_wallet]);
      

   }
      function  addEmployeeToArray(Employee []  memory listEmp) private view  returns (Employee [] memory){
       Employee[] memory result = new Employee[](listEmp.length);
        for(uint i; i<listEmp.length; ++i){
           if(listEmp[i].companyAddress==msg.sender){
            result[i]=listOfEmp[i];
           } 
         }
         return result;
   }
   function getAllCompanyEmployee() public onlyOwner(owner) view returns(Employee [] memory c){
      c= addEmployeeToArray(listOfEmp);
      return c;
      
   }

   function getEmployee(address _wallet)  public view returns (uint, string memory, address) {
   
      return (employees[_wallet].salary, employees[_wallet].name, employees[_wallet].wallet);

   }
  function paySalaries() public onlyOwner(owner) payable  { 
      
         for(uint i; i<employeesAddress.length; ++i){
           employees[employeesAddress[i]].wallet.transfer(employees[employeesAddress[i]].salary); 
         }

   }


  /* function checkValidityAndPaySalaries ()  external payable  {
      if (now >= salaryDate) {
         paySalaries();
      }
   }*/
}
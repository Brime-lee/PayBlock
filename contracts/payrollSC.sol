// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract SalaryPayment {

    address owner;
    mapping (address=>bool) public isEmployee;
    mapping (address => Employee) employees; 
    address[] public allCompanyEmployees;

    address[] marketers;
    address[] developers;
    address[] managers;

    enum Designation {Marketers, Developers, Managers}

    struct Employee {
        address employeeAddress;
        Designation employeePosition;
        uint amount;
    }

    constructor(){
        owner = msg.sender;
    }


    
    function addEmployee(address payable employeeAddress, Designation _position) public {
        isEmployee[employeeAddress] = true;

        uint designatedPay;

        if (_position == Designation.Marketers) {
            marketers.push(employeeAddress);
            designatedPay = 0.01 ether;
        } 
        else if (_position == Designation.Developers) {
            developers.push(employeeAddress);
            designatedPay = 0.02 ether;
        } 
        else if (_position == Designation.Managers) {
            managers.push(employeeAddress);
            designatedPay = 0.03 ether;
        }

        Employee memory newEmployee = Employee(employeeAddress,_position, designatedPay);
        employees[employeeAddress] = newEmployee;
        allCompanyEmployees.push(employeeAddress);
    }

    function getAllEmployees() public view returns (address[] memory, address[] memory, address[] memory) {
        return (marketers, developers, managers);
    }


    function payEmployeesSalaries() public payable {
        for (uint i = 0; i < allCompanyEmployees.length; i++) {
            payable(allCompanyEmployees[i]).transfer(employees[allCompanyEmployees[i]].amount);
        }
    }
}
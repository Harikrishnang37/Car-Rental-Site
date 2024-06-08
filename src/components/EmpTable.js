import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { PopUpEmpRemovalConfirmation } from "./PopUpEmpRemovalConfirmation";


  export const EmpTable = (props) => {

    function displayDate(inpDate){
        return inpDate.slice(0,10) + " "+ inpDate.slice(11,16);
    }

    return(
        <Table>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead >Action</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    props.empArr.map( (row) => (
                        <TableRow key = {row.emp_id}>
                        <TableCell >{row.emp_id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.Gender}</TableCell>
                        <TableCell>{row.JoinDate}</TableCell>
                        <TableCell className="text-right"> 
                            <PopUpEmpRemovalConfirmation emp_id = {row.emp_id} removeEmployee= {props.removeEmployee}> </PopUpEmpRemovalConfirmation> 
                        </TableCell>
                        </TableRow>
                    ))
                }

            </TableBody>
        </Table>
    )

  }
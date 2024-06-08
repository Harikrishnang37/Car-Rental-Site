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
import { PopUpManRemovalConfirmation } from "./PopUpManRemovalConfirmation";


  export const ManTable = (props) => {

    function displayDate(inpDate){
        return inpDate.slice(0,10) + " "+ inpDate.slice(11,16);
    }

    return(
        <Table>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Branch ID</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Manger ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Action</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    props.empArr.map( (row) => (
                        <TableRow key = {row.branch_id}>
                        <TableCell >{row.branch_id}</TableCell>
                        <TableCell >{row.branch_name}</TableCell>
                        <TableCell>{row.emp_id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.gender}</TableCell>
                        <TableCell>{displayDate(row.JoinDate)}</TableCell>
                        <TableCell> 
                            <PopUpManRemovalConfirmation emp_id = {row} removeEmployee= {props.removeEmployee}> </PopUpManRemovalConfirmation> 
                        </TableCell>
                        </TableRow>
                    ))
                }

            </TableBody>
        </Table>
    )

  }
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


  export const AnalyticsTable = (props) => {

    function displayDate(inpDate){
        return inpDate.slice(0,10) + " "+ inpDate.slice(11,16);
    }

    console.log(props);

    return(
        <Table>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Branch ID</TableHead>
                <TableHead>Branch Name</TableHead>
                <TableHead>Manager ID</TableHead>
                <TableHead>Manager Name</TableHead>
                <TableHead >Revenue</TableHead>
                <TableHead >Sales</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    (props.empArr).map( (row) => (
                        <TableRow key = {row.branch_id}>
                        <TableCell >{row.branch_id}</TableCell>
                        <TableCell >{row.branch_name}</TableCell>
                        <TableCell>{row.manager_id}</TableCell>
                        <TableCell>{row.manager_name}</TableCell>
                        <TableCell>{row.revenue}</TableCell>
                        <TableCell>{row.sales}</TableCell>

                        </TableRow>
                    ))
                }

            </TableBody>
        </Table>
    )

  }
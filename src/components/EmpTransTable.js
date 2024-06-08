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


  export const EmpTransTable = (props) => {

    function displayDate(inpDate){
        return inpDate.slice(0,10) + " "+ inpDate.slice(11,16);
    }

    return(
        <Table>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Car</TableHead>
                <TableHead>Reg. No.</TableHead>
                <TableHead>Customer Id</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    props.transArr.map( (row) => (
                        <TableRow key = {row.reg_no}>
                        <TableCell >{row.brand + " " +row.model}</TableCell>
                        <TableCell>{row.reg_no}</TableCell>
                        <TableCell>{row.cust_id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{displayDate(row.startTime)}</TableCell>
                        <TableCell className="text-right">{displayDate(row.endTime)}</TableCell>
                        <TableCell className="text-right">{row.amount}</TableCell>
                        <TableCell className="text-right">{row.status}</TableCell>
                        </TableRow>
                    ))
                }

            </TableBody>
        </Table>
    )

  }
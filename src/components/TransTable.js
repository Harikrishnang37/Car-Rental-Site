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

  export const TransTable = (transArr) => {

    function displayDate(inpDate){
        return inpDate.slice(0,10) + " "+ inpDate.slice(11,16);
    }

    return(
        <Table>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px] self-center">Car</TableHead>
                <TableHead>Reg. No.</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead className="text-right">End Time</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    transArr.transArr.map( (row) => (
                        <TableRow key = {row.reg_no}>
                        <TableCell >{row.brand + " " +row.model}</TableCell>
                        <TableCell>{row.reg_no}</TableCell>
                        <TableCell>{row.branch}</TableCell>
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
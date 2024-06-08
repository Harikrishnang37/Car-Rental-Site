
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

  import { Button } from "@/components/ui/button"
  import { useRouter } from 'next/navigation'

  export const MarkableTransTable = (props) => {

    const router = useRouter();

    function displayDate(inpDate){
        return inpDate.slice(0,10) + " "+ inpDate.slice(11,16);
    }

    async function markAsCompleted(row){

        console.log("button clicked", row)

        await fetch('http://localhost:3000/api/db/markAsCompleted',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                trans_id : row.trans_id
            })
        }).then((response) => response.json())
        .then((data) => {
          console.log("marked as completed",data)
  
        });

        fetch('http://localhost:3000/api/db/empViewInProgressCars',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              email : "",
              branch: row.branch
            })
        }).then((response) => response.json())
        .then((data) => {
            console.log("inprog after button",data)
          window.localStorage.setItem('emp_inprog_cars', JSON.stringify(data));
          props.setInprogCars(data);
  
        });

        fetch('http://localhost:3000/api/db/empViewPastCars',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              email : "",
              branch : row.branch
            })
        }).then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem('emp_past_cars', JSON.stringify(data));
          props.setPastCars(data)
  
        });

        router.refresh();

    }
  

    return(
        <Table>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Car</TableHead>
                <TableHead>Reg. No.</TableHead>
                <TableHead>Customer ID</TableHead>
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
                        <TableCell className="text-right"> <Button variant="outline" onClick = {()=> markAsCompleted(row)}>Mark As Completed</Button> </TableCell>
                        </TableRow>
                    ))
                }

            </TableBody>
        </Table>
    )

  }
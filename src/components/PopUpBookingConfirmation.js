import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

export const PopUpBookingConfirmation = (props) => {

    return(
        <AlertDialog>
            <AlertDialogTrigger className="bg-orange-400 rounded-md p-2 text-xl ">Proceed to Pay</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Booking Successful!</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogAction onClick = {props.makeBooking}>OK</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}
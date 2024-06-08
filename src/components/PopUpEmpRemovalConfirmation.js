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
  

export const PopUpEmpRemovalConfirmation = (props) => {

    return(
        <AlertDialog>
            <AlertDialogTrigger>Remove</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Confirm Removal</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently remove the employee.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick = {()=> {props.removeEmployee(props.emp_id)}}>YES</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}
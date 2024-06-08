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
  

export const PopUpManRemovalConfirmation = (props) => {

    return(
        <AlertDialog>
            <AlertDialogTrigger>Change Manager</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Existing Manager will be removed</AlertDialogTitle>
                <AlertDialogDescription>
                    Once you fill the details of the new manager, the old manager will be removed.
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
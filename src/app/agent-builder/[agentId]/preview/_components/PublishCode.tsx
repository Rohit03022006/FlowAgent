import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button';

type Props = {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
}
export default function PublishCode({ openDialog, setOpenDialog }: Props) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Get Code</DialogTitle>
            </DialogHeader>
            <DialogFooter>
                <Button variant={'outline'} onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button onClick={() => setOpenDialog(false)}>Get Code</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}


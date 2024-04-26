import React from 'react';
import Grid from "../../components/grid";
import Dialog from './Dialog';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Create from './Create';


const UserPage = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <h1>User Page</h1>
            <Stack style={{ margin: 5 }} spacing={2} direction="row">
                <Button variant="contained" onClick={() => setOpen(true)}>Create</Button>
            </Stack>
            <Grid endpoint="api/user" />
            <Dialog fullWidth={true} maxWidth={"lg"} open={open} setOpen={setOpen} >
                < Create/>
            </Dialog>
        </div>
    );
};

export default UserPage;
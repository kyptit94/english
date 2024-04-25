import React from 'react';
import Grid from "../components/grid";

const UserPage = () => {
    return (
        <div>
            <h1>User Page</h1>
            {/* Add your user page content here */}
            <Grid endpoint="api/user" />
        </div>
    );
};

export default UserPage;
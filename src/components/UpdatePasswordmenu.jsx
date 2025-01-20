// Import necessary modules
import { useState } from 'react';
import { Menu, MenuItem, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../features/authSlice'; // Ensure correct path for your updatePassword action

const UpdatePasswordMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null); // For menu handling
    const [openDialog, setOpenDialog] = useState(false); // For dialog handling
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const user = useSelector((state) => state.auth.user); // Ensure user is in auth state
    const dispatch = useDispatch();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDialogOpen = () => {
        setOpenDialog(true);
        handleMenuClose();
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const handlePasswordUpdate = () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            alert("Please fill out all fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("New Password and Confirm Password do not match.");
            return;
        }

        const userId = user.id; // Assuming the user object has an `id` field
        const  password = oldPassword; // Old password for validation
        console.log(userId,  password, newPassword);
        
        // Dispatch the updatePassword action with the user id, old password, and new password
        dispatch(updatePassword({ userId,  password, newPassword }));

        // Close dialog after updating
        handleDialogClose();
    };

    return (
        <>
            {/* Button to open menu */}
            <Button
                color="inherit"
                onClick={handleMenuOpen}
                startIcon={<SettingsIcon style={{ color: 'white' }} />}
                style={{ color: 'white' }}
                className="flex items-center text-white font-semibold  rounded-md shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            > Settings
            </Button>

            {/* Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleDialogOpen}>Update Password</MenuItem>
            </Menu>

            {/* Dialog for updating password */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Update Password</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Old Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <TextField
                        label="New Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handlePasswordUpdate} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UpdatePasswordMenu;

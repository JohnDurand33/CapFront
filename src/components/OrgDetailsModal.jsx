import { Modal, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';


const OrgDetailsModal = ({ open, handleClose, orgDetails, dogName, dogApiId }) => {
    const theme = useTheme();
    
    const modalStyle = {
        backGroundColor: theme.palette.background.paper,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const createMailToLink = (email, dogName, dogApiId) => {
        const subject = encodeURIComponent(`Interest in Adopting ${dogName}`);
        const body = encodeURIComponent(`Hello,\n\nI am interested in adopting ${dogName} (ID: ${dogApiId}). Could you please provide more information?\n\nThank you!`);
        return `mailto:${email}?subject=${subject}&body=${body}`;
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-title" variant="h6" component="h2">
                    Organization Details
                </Typography>
                {orgDetails ? (
                    <>
                        <Typography variant="body2" color="textSecondary">
                            Name: {orgDetails.name}
                        </Typography>
                        {orgDetails.email && (
                            <Typography variant="body2" color="textSecondary">
                                Email (Click Link to Send): <a href={createMailToLink(orgDetails.email, dogName, dogApiId)}>{orgDetails.email}</a>
                            </Typography>
                        )}
                        {orgDetails.website_url && (
                            <Typography variant="body2" color="textSecondary">
                                Website: <a href={orgDetails.website_url} target="_blank" rel="noopener noreferrer">{orgDetails.website_url}</a>
                            </Typography>
                        )}
                        {orgDetails.adoption_url && (
                            <Typography variant="body2" color="textSecondary">
                                Adoption URL: <a href={orgDetails.adoption_url} target="_blank" rel="noopener noreferrer">{orgDetails.adoption_url}</a>
                            </Typography>
                        )}
                        {orgDetails.fb_url && (
                            <Typography variant="body2" color="textSecondary">
                                Facebook: <a href={orgDetails.fb_url} target="_blank" rel="noopener noreferrer">{orgDetails.fb_url}</a>
                            </Typography>
                        )}
                        <Typography variant="body2" color="textSecondary">
                            Location: {orgDetails.city}, {orgDetails.state}
                        </Typography>
                    </>
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        Loading...
                    </Typography>
                )}
            </Box>
        </Modal>
    );
};

export default OrgDetailsModal;
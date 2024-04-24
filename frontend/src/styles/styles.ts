import { Theme } from '@mui/material/styles';

export const getStyles = (theme: Theme) => ({
  cardStyle: {
    width: '60%',
    minHeight: '10rem',
    maxHeight: '15rem',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    margin: '0 0 1rem 0',
    padding: '1rem',
    gap: '1rem',
    alignItems: 'center',
    transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
    boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      boxShadow: '0px 20px 25px rgba(0, 0, 0, 0.25)',
      backgroundColor: '#F5F5F5',
      cursor: 'pointer'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexDirection: 'column' as const,
      minHeight: '18rem',
      maxHeight: '18rem', // Ajuste conforme necessário para telas menores
    },
  },
});

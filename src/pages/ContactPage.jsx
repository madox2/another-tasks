import { Box, Typography } from '@mui/material'

export function ContactPage() {
  return (
    <Box textAlign="center" minHeight="calc(100vh - 160px)" pt={10}>
      <Typography variant="h2" pb={4}>
        Contact
      </Typography>
      <Typography paragraph>
        Have you experienced a bug or do you have an improvement idea? Contact
        me with any kind of feecback at:
      </Typography>
      <Typography paragraph>mx.bielik@gmail.com</Typography>
    </Box>
  )
}

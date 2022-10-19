import { Box } from '@mui/material'

import { useThemeUtils } from '../../utils/themeUtils'

export function Toolbox({ children }) {
  const { toolboxHeight } = useThemeUtils()
  return (
    <Box display="flex" columnGap={1} p={1} pl={2} height={toolboxHeight}>
      {children}
    </Box>
  )
}

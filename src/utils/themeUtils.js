import { useTheme } from '@mui/material'

export function useThemeUtils() {
  const theme = useTheme()
  const appBarHeight =
    theme.mixins.toolbar['@media (min-width:600px)'].minHeight
  const toolboxHeight = `50px`
  const scrollContentHeight = `calc(100vh - ${appBarHeight}px - ${toolboxHeight})`
  return { appBarHeight, toolboxHeight, scrollContentHeight }
}

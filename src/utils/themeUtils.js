import { useTheme } from '@mui/material'

export function useThemeUtils() {
  const theme = useTheme()
  const appBarHeight =
    theme.mixins.toolbar['@media (min-width:600px)'].minHeight
  const mainContentHeight = `calc(100vh - ${appBarHeight}px)`
  return { appBarHeight, mainContentHeight }
}

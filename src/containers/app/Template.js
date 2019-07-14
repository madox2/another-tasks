import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useContext } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { CURRENT_USER } from '../../queries/loginQueries'
import { LoadingConext } from './common/LoadingContext'
import { LogoutButton } from './login/LogoutButton'
import ErrorBoundary from '../../components/ErrorBoundary'
import GlobalLoadingIndicator from './common/GlobalLoadingIndicator'
import Sidebar from './Sidebar'
import logo from '../../resources/logo.png'

const drawerWidth = 280

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  userToolbar: {
    padding: 5,
    paddingLeft: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
  },
}))

function Template(props) {
  const { right, toolbar, container, children } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { loading } = useContext(LoadingConext)

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={`${classes.toolbar} ${classes.userToolbar}`}>
        <img src={logo} style={{ height: 35 }} alt="logo" />
        <LogoutButton />
      </div>
      <Divider />
      <Sidebar />
    </div>
  )

  return (
    <ErrorBoundary>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} color="primary">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {toolbar}
            </Typography>
            <div style={{ flex: 1 }} />
            {right}
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {!!loading && <LinearProgress />}
          {children}
        </main>
      </div>
    </ErrorBoundary>
  )
}

const withAuthRedirect = Component => props => (
  <Query query={CURRENT_USER}>
    {({ loading, error, data }) => {
      if (loading) return <GlobalLoadingIndicator />
      if (error) return <Redirect to="/" />
      const isSignedIn = data.currentUser && data.currentUser.isSignedIn
      return isSignedIn ? <Component {...props} /> : <Redirect to="/" />
    }}
  </Query>
)

export default withAuthRedirect(Template)

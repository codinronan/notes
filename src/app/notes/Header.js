import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import UserIcon from '@material-ui/icons/Mood';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import {toggleEditNote} from '../../store/notes/actionCreators';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing.unit,
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
  header: {
    background: '#eaeff1',
  },
  avatar: {
    color: theme.palette.primary.main,
  },
  create: {
    color: theme.palette.primary.dark,
  },
  delete: {
    color: theme.palette.primary.light,
  },
});

class Header extends Component {

  toggleEdit = () => {
		this.props.dispatch(toggleEditNote());
  }

  render = () => {
    const { classes, onDrawerToggle } = this.props;

    return (
      <React.Fragment>
        <AppBar className={classes.header} color="default" position="sticky" elevation={0}>
          <Toolbar>
            <Grid container spacing={8} alignItems="center">
              <Hidden smUp>
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={onDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
              </Hidden>

              {!this.props.editingNote &&
                <Grid item>
                  <Tooltip title="Edit this note">
                    <IconButton color="inherit" onClick={this.toggleEdit}>
                      <CreateIcon className={classes.create} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              }

              {this.props.editingNote &&
                <Grid item>
                  <Tooltip title="Save change to note">
                    <IconButton color="inherit" onClick={this.toggleEdit}>
                      <SaveIcon className={classes.create} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              }

              <Grid item>
                <Tooltip title="Delete this note">
                  <IconButton color="inherit">
                    <DeleteIcon className={classes.delete} />
                  </IconButton>
                </Tooltip>
              </Grid>

              <Grid item xs />

              <Grid item>
                <IconButton color="inherit">
                  <UserIcon className={classes.avatar} />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

// redux
function mapStateToProps(state) {
	return {
		editingNote: state.editingNote
	};
}

export default withStyles(styles)(connect(mapStateToProps)(Header));
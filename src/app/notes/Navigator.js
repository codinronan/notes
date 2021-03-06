import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import {setNotes} from '../../store/notes/actionCreators';

import client from '../../apiclient/';

const styles = theme => ({
  categoryHeader: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: 16,
    paddingBottom: 16,
  },
  firebase: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white,
  },
  itemActionable: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    color: 'inherit',
    fontSize: theme.typography.fontSize,
    '&$textDense': {
      fontSize: theme.typography.fontSize,
    },
  },
  textDense: {},
  divider: {
    marginTop: theme.spacing.unit * 2,
  },
  drawerPaper: {
    width: 256,
  },
});

class Navigator extends Component {
  newNote = () => {
    var noteTitle = "Note " + (Object.keys(this.props.notes).length + 1);
    // TODO: add note in global state rather than requesting entire list again
    client.notes().create({name: noteTitle, content: "# " + noteTitle + "\n"}, this.listNotes, this.err)
  } 

  err = (response) => {
    console.log("error --");
    console.log(response);
  }

  recieveNotes = (response) => {
		this.props.dispatch(setNotes(response.data.items));
  }

  listNotes = () => {
    client.notes().list(this.recieveNotes, this.err)
  }

  componentDidMount = () => {
    this.listNotes();
  }

  selectNote = (noteId) => {
    const history = this.props.history;
    history.push('/' + noteId);
  }

  render() {

    const { classes, variant, open, onClose, notes } = this.props;
  
    var notesArr = [];
    if(notes) {
      notesArr = Object.values(notes);
    }

    const categories = [
      {
        id: 'My Notes',
        children: notesArr,
      },
    ];

    return (
      <Drawer variant={variant} open={open} onClose={onClose} classes={{paper: classes.drawerPaper}}>
        <List disablePadding>
          <ListItem className={classNames(classes.firebase, classes.item, classes.itemCategory)}>
            notes
          </ListItem>
          <ListItem button onClick={this.newNote} className={classNames(classes.item, classes.itemCategory)}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary,
              }}>
              New Note
            </ListItemText>
          </ListItem>
          {categories.map(({ id, children }) => (
            <React.Fragment key={id}>
              <ListItem className={classes.categoryHeader}>
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary,
                  }}
                >
                </ListItemText>
              </ListItem>
              {children.map(({ id: noteId, name }) => (
                <ListItem
                  button
                  dense
                  selected={noteId === this.props.noteId}
                  key={noteId}
                  onClick={() => this.selectNote(noteId)}
                  className={classNames(
                    classes.item,
                    classes.itemActionable,
                    (noteId === this.props.noteId) && classes.itemActiveItem,
                  )}
                >
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                      textDense: classes.textDense,
                    }}
                  >
                    {name}
                  </ListItemText>
                </ListItem>
              ))}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    );
  }
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

// redux
function mapStateToProps(state) {
	return {
    noteId: state.noteId,
    notes: state.notes
	};
}

export default withStyles(styles)(connect(mapStateToProps)(Navigator));
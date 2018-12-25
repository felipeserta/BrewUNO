import React, { Component } from 'react';
import { SortableContainer, SortableElement, arrayMove, SortableHandle } from 'react-sortable-hoc';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import Typography from '@material-ui/core/Typography'

class SortableList extends Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.callbackItemsSorted(arrayMove(this.props.items, oldIndex, newIndex))
  };

  deleteItem = (index) => {
    this.props.callbackItemDeleted(index)
  }

  getItemText = (item) => {
    if (this.props.boil) {
      return 'at ' + item.time + ' min';
    }
    return item.time + ' mins at ' + item.temperature + ' ºC'
  }

  render() {
    const DragHandle = SortableHandle(() => <DragIndicatorIcon />);
    const SortableItem = SortableElement(({ value, itemIndex }) =>
      <ListItem>
        {this.props.dragHandle ? <DragHandle /> : null}
        <ListItemText
          primary={value.name}
          secondary={<Typography>{this.getItemText(value)}</Typography>}
        />
        {!this.props.boil ? <Switch checked={value.recirculation} /> : null}
        <IconButton aria-label="Delete"
          onClick={() => this.deleteItem(itemIndex)}
          disabled={this.props.items.length <= 1}>
          <DeleteIcon fontSize="madium" />
        </IconButton>
      </ListItem>
    );

    const SortableList = SortableContainer(({ items }) => {
      return (
        <List>
          {items.map((value, index) => (
            <SortableItem key={`item-${index}`} index={index} value={value} itemIndex={index} />
          ))}
        </List>
      );
    });

    return <SortableList items={this.props.items} onSortEnd={this.onSortEnd} useDragHandle={true} />
  }
}

export default (SortableList);
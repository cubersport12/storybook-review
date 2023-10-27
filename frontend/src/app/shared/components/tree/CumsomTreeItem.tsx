import { Stack, Typography } from '@mui/material';
import { TreeItem, TreeItemContentProps, TreeItemProps, useTreeItem } from '@mui/x-tree-view';
import { forwardRef, Ref } from 'react';
import clsx from 'clsx';

const CustomContent = forwardRef((props: TreeItemContentProps, ref) => {
  const { classes, className, label, nodeId, icon: iconProp, expansionIcon, displayIcon } = props;

  const { disabled, expanded, selected, focused, handleExpansion, handleSelection, preventSelection } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event: any) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event: any) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (event: any) => {
    handleSelection(event);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled
      })}
      onMouseDown={handleMouseDown}
      ref={ref as Ref<HTMLDivElement>}
    >
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography onClick={handleSelectionClick} component="div" className={classes.label}>
        {label}
      </Typography>
    </Stack>
  );
});

export const CustomTreeItem = forwardRef((props: TreeItemProps, ref: Ref<HTMLLIElement>) => {
  return <TreeItem ContentComponent={CustomContent} {...props} ref={ref} />;
});

import { icons } from '@shared/utils';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import { SyntheticEvent, useEffect, useState } from 'react';
import { merge, uniq, uniqueId } from 'lodash';
import { CustomTreeItem } from './CumsomTreeItem';
import { AppTreeNode, AppTreeNodeExtraOptions } from './types';
import { Checkbox, Stack } from '@mui/material';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';

type AppTreeNodeExt = {
  isLoading?: boolean;
} & AppTreeNode;

type AppTreeNodeExtraOptionsExt = {
  checkedNodes: string[];
  handleCheck: (nodeId: string) => void;
} & AppTreeNodeExtraOptions;

type NodeStateModel = {
  isExpanded?: boolean;
  nodes?: AppTreeNodeExt[];
};

export const handleNodes = (parentId: string | null, map: Map<string | null, NodeStateModel>, extraOptions: AppTreeNodeExtraOptionsExt) => {
  const model = map.get(parentId);
  if (!model?.isExpanded || !model?.nodes) {
    return null;
  }

  return model.nodes?.map(node => (
    <Stack direction="row" key={node.id}>
      {extraOptions?.canCheck ? (
        <Checkbox
          onClick={() => extraOptions.handleCheck(node.id)}
          checked={extraOptions.checkedNodes.includes(node.id)}
          sx={{ width: '24px', height: '24px', alignSelf: 'flex-start' }}
        />
      ) : null}
      <CustomTreeItem key={node.id} nodeId={node.id} label={node.label} icon={node.isLoading ? <i className={icons.animationSpinner} /> : null}>
        {node.expandable === false ? null : (
          <>
            {handleNodes(node.id, map, extraOptions)}
            {<TreeItem nodeId={uniqueId()} />}
          </>
        )}
      </CustomTreeItem>
    </Stack>
  ));
};

export const AppTree = ({
  nodes,
  getChildren,
  canCheck,
  onNodeSelect,
  onNodeCheck
}: {
  onNodeCheck?: (nodeId: string, nodesIds: string[]) => void;
  onNodeSelect?: (nodeId: string) => void;
  nodes: AppTreeNode[];
  getChildren?: (parentId: string, parentNode?: AppTreeNode) => Promise<AppTreeNode[]>;
} & AppTreeNodeExtraOptions) => {
  const [nodesMap, setNodesMap] = useState(new Map<string | null, NodeStateModel>([[null, { isExpanded: true, nodes }]]));
  const [checkedNodes, setCheckedNodes] = useState<string[]>([]);
  const refreshNodesMap = () => setNodesMap(new Map(nodesMap));
  const findNode = (id: string) =>
    Array.from(nodesMap.values())
      .flatMap(x => x.nodes?.flat())
      .find(x => x!.id === id);

  const setLoading = (id: string, isLoading: boolean) => {
    const expandingNode = findNode(id);
    if (expandingNode) {
      expandingNode.isLoading = isLoading;
      return true;
    }
    return false;
  };

  const handleToggle = (event: SyntheticEvent, nodeIds: string[]) => {
    if (!getChildren) {
      return;
    }

    let parentId = nodeIds.find(x => !nodesMap.has(x));
    if (!parentId) {
      return;
    }

    if (setLoading(parentId, true)) {
      refreshNodesMap();
    }
    const parentNode = Array.from(nodesMap)
      .map(x => x[1].nodes ?? [])
      .flat()
      .find(x => x.id === parentId);
    getChildren(parentId, parentNode).then(result => {
      setLoading(parentId!, false);
      nodesMap.set(parentId!, { isExpanded: true, nodes: result });
      refreshNodesMap();
    });
  };
  const handleCheck = (nodeId: string) => {
    if (checkedNodes.includes(nodeId)) {
      checkedNodes.splice(checkedNodes.indexOf(nodeId), 1);
    } else {
      checkedNodes.push(nodeId);
    }
    if (onNodeCheck) {
      onNodeCheck(nodeId, checkedNodes);
    }
    setCheckedNodes([...checkedNodes]);
  };
  const handeSelect = (event: SyntheticEvent, nodeId: string) => {
    handleCheck(nodeId);
    if (onNodeSelect) {
      onNodeSelect(nodeId);
    }
  };
  return (
    <TreeView
      sx={{ '.MuiTreeItem-content': { paddingLeft: 0 } }}
      onNodeToggle={handleToggle}
      onNodeSelect={handeSelect}
      defaultCollapseIcon={<ArrowDropDown />}
      defaultExpandIcon={<ArrowRight />}
    >
      {handleNodes(null, nodesMap, { canCheck, checkedNodes, handleCheck })}
    </TreeView>
  );
};

import { useQuery } from '@tanstack/react-query';
import { BranchesService, ReposService } from '@shared/api';
import { AppCard, AppTree, AppTreeNode } from '@shared/components';
import { useNavigate } from 'react-router-dom';
import { replace } from 'lodash';

enum PseudoType {
  Repo,
  Branch,
  Build
}

type AppTreeNodeMeta = {
  parent?: AppTreeNode;
  data: any;
};

export const StoriesTree = () => {
  const repos = useQuery({
    queryKey: ['repos'],
    queryFn: () => ReposService.reposControllerGetRepos()
  });
  const navigate = useNavigate();
  const handleSelect = (node: AppTreeNode) => {
    if (node.type === PseudoType.Branch) {
      const meta = node.meta as AppTreeNodeMeta;
      const repoNode = meta.parent;
      if (!repoNode) {
        throw new Error();
      }
      navigate(`${repoNode.id!}/${node.id}`, { relative: 'route' });
    }
  };
  const createNodeMeta = (parent: AppTreeNode | undefined, data: any): AppTreeNodeMeta => ({
    parent,
    data
  });
  const getChildren = (parentId: string, node?: AppTreeNode) =>
    new Promise<AppTreeNode[]>((resolve, reject) => {
      switch (node?.type as PseudoType) {
        case PseudoType.Repo:
          BranchesService.branchesControllerGetBranches(parentId).then(r =>
            resolve(
              r.map(x => ({
                id: x.id,
                label: replace(x.name!, 'refs/heads/', ''),
                expandable: false,
                meta: createNodeMeta(node, x),
                type: PseudoType.Branch
              }))
            )
          );
          break;
        default:
          reject();
      }
    });
  return (
    <AppCard label="Дерево" description="sasddsf">
      <>
        {repos.data?.projects && (
          <AppTree
            onNodeSelect={handleSelect}
            getChildren={getChildren}
            nodes={
              repos.data?.projects?.map(x => ({
                id: x.id!,
                label: x.name!,
                expandable: true,
                meta: createNodeMeta(undefined, x),
                type: PseudoType.Repo
              })) ?? []
            }
          />
        )}
      </>
    </AppCard>
  );
};

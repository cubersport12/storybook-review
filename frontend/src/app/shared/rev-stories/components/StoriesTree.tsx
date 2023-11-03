import { useQuery } from '@tanstack/react-query';
import { BranchesService, BuildsService, ReposService } from '@shared/api';
import { AppCard, AppTree, AppTreeNode } from '@shared/components';
import { icons } from '@shared/utils';

enum PseudoType {
  Repo,
  Branch,
  Build
}

export const StoriesTree = () => {
  const repos = useQuery({
    queryKey: ['repos'],
    queryFn: () => ReposService.reposControllerGetRepos()
  });
  const getChildren = (parentId: string, node?: AppTreeNode) =>
    new Promise<AppTreeNode[]>((resolve, reject) => {
      switch (node?.type as PseudoType) {
        case PseudoType.Repo:
          BranchesService.branchesControllerGetBranches(parentId).then(r =>
            resolve(
              r.map(x => ({
                id: x.id,
                label: x.name!,
                expandable: true,
                meta: x,
                type: PseudoType.Branch
              }))
            )
          );
          break;
        case PseudoType.Branch:
          BuildsService.buildsControllerGetBuilds(parentId).then(b =>
            resolve(
              b.map(x => ({
                id: `${x.id}`,
                label: x.name,
                expandable: false,
                type: PseudoType.Build,
                meta: x
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
            getChildren={getChildren}
            nodes={
              repos.data?.projects?.map(x => ({
                id: x.id!,
                label: x.name!,
                expandable: true,
                meta: x,
                type: PseudoType.Repo
              })) ?? []
            }
          />
        )}
      </>
    </AppCard>
  );
};

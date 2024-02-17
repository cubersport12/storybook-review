import { BranchDto, BranchesService, RepoBranchDto, ReposService } from '@shared/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { AppSelect } from './AppSelect';
import { MenuItem } from '@mui/material';

export const AppBarBranchSelector = ({ selectionChange }: { selectionChange?: (b: BranchDto) => void }) => {
  const [branches, setBranches] = useState<RepoBranchDto[]>([]);
  const repos = useQuery({
    queryKey: ['repos'],
    queryFn: () => ReposService.reposControllerGetRepos()
  });
  useEffect(() => {
    const ids = repos.data?.projects?.map(x => x.id);
    if (ids && ids.length > 0) {
      BranchesService.branchesControllerGetBranchesByRepoIds(ids).then(result => {
        setBranches(result);
      });
    }
  }, [repos.data]);
  const allBranches = branches.map(x => x.branches).flat();
  return (
    <AppSelect>
      {allBranches.map(x => (
        <MenuItem key={x?.id}>
          {x?.name} ({repos.data?.projects?.find(p => p?.id === x?.repositoryId)?.name})
        </MenuItem>
      ))}
    </AppSelect>
  );
};

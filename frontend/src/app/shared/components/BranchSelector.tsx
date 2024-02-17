import { BranchDto, BranchesService, RepoBranchDto, ReposService } from '@shared/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { AppSelect } from './AppSelect';
import { MenuItem } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../store/StoreProvider';

const BranchSelector = ({ valueChange, value }: { valueChange?: (b: string) => void; value: string | undefined }) => {
  const { reposStore, branchesStore } = useStore();
  useEffect(() => {
    reposStore.fetchRepos();
  }, [reposStore.repos]);
  if (reposStore.repos.length > 0) {
    branchesStore.fetchBranchesByRepos(reposStore.repos.map(x => x.id));
  }

  const repos = reposStore.repos;
  const branches = branchesStore.branches;

  return (
    <AppSelect value={value} onChange={e => valueChange && valueChange(e)}>
      {branches.map(x => (
        <MenuItem key={x?.id}>
          {x?.name} ({repos.find(p => p?.id === x?.repositoryId)?.name})
        </MenuItem>
      ))}
    </AppSelect>
  );
};

export default observer(BranchSelector);

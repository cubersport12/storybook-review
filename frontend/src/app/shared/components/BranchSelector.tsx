import { BranchDto, BranchesService, RepoBranchDto, ReposService } from '@shared/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { AppSelect } from './AppSelect';
import { Avatar, MenuItem, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '@shared/store';
import { replace } from 'lodash';
import { stringToColour } from '../utils';

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
      {branches.map(x => {
        const repoName = repos.find(p => p?.id === x?.repositoryId)?.name;
        return (
          <MenuItem key={x?.id} value={x.id}>
            <Stack direction="row" alignItems="center" gap="5px">
              <Avatar sx={{ width: '22px', height: '22px', fontSize: '12px', backgroundColor: stringToColour(repoName ?? '') }}>
                {repoName
                  ?.split(' ')
                  .map(s => s.at(0)?.toUpperCase())
                  .join('')}
              </Avatar>

              {replace(x.name!, 'refs/heads/', '')}
            </Stack>
          </MenuItem>
        );
      })}
    </AppSelect>
  );
};

export default observer(BranchSelector);

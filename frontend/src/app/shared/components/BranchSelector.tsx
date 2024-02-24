import { BranchDto, BranchesService, RepoBranchDto, ReposService } from '@shared/api';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';
import { AppSelect } from './AppSelect';
import { Avatar, ListSubheader, MenuItem, Select, Stack, SxProps, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '@shared/store';
import { groupBy, map, replace } from 'lodash';
import { stringToColour } from '../utils';

const BranchDescription = ({ desc, sx }: { desc: string | undefined; sx?: SxProps }) => {
  return (
    desc && (
      <Typography sx={sx} variant="caption">
        {desc}
      </Typography>
    )
  );
};
const AvatarByString = ({ str }: { str: string | undefined | null }) => (
  <Avatar sx={{ width: '26px', height: '26px', fontSize: '12px', backgroundColor: stringToColour(str ?? '') }}>
    {str
      ?.split(' ')
      .map(s => s.at(0)?.toUpperCase())
      .join('')}
  </Avatar>
);

const BranchSelector = ({ valueChange, value }: { valueChange?: (b: string) => void; value: string | undefined }) => {
  const { reposStore, branchesStore } = useStore();
  reposStore.fetchRepos();

  useEffect(() => {
    if (reposStore.repos.length > 0) {
      branchesStore.fetchBranchesByRepos(reposStore.repos.map(x => x.id));
    }
  }, [reposStore.repos]);
  const repos = reposStore.repos;
  const branches = branchesStore.branches;

  return (
    <AppSelect
      value={value}
      onChange={e => valueChange && valueChange(e)}
      renderValue={selectedId => {
        const branch = branches?.find(p => p?.id === selectedId);
        const repo = repos.find(x => x.id === branch?.repositoryId);
        return (
          <Stack direction="row" gap="5px">
            <AvatarByString str={repo?.name} />
            {branch?.name}
            {branch?.user && (
              <BranchDescription
                sx={{ lineHeight: '24px' }}
                desc={`(${branch.user} опубликовал в ${new Date(branch.lastPublished).toLocaleString()})`}
              />
            )}
          </Stack>
        );
      }}
    >
      {map(
        groupBy(branches, x => x.repositoryId),
        (values, key) => {
          const repoName = repos.find(p => p?.id === key)?.name;
          const result: ReactNode[] = [<ListSubheader key={repoName}>{repoName}</ListSubheader>];
          values.forEach(x => {
            result.push(
              <MenuItem key={x?.id} value={x.id}>
                <Stack direction="row" alignItems="center" gap="5px">
                  <AvatarByString str={repoName} />

                  <Typography>{replace(x.name!, 'refs/heads/', '')}</Typography>
                  {x?.user && (
                    <BranchDescription sx={{ lineHeight: '24px' }} desc={`(${x.user} опубликовал в ${new Date(x.lastPublished).toLocaleString()})`} />
                  )}
                </Stack>
              </MenuItem>
            );
          });
          return result;
        }
      ).flat()}
    </AppSelect>
  );
};

export default observer(BranchSelector);

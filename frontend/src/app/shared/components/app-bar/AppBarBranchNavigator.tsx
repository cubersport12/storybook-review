import { observer } from 'mobx-react';
import { useStore } from '@shared/store';
import { useEffect, useState } from 'react';
import { BranchDto } from '@shared/api';
import BranchSelector from '../BranchSelector';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';

const AppBarBranchSelector = () => {
  const { branchId: paramBranchId } = useParams();
  const [branchId, setBranchId] = useState<string | undefined>(paramBranchId);
  const { branchesStore, reposStore } = useStore();
  const navigate = useNavigate();
  console.info(branchId);

  const handleBranchId = (id: string | undefined) => {
    if (!id) {
      return;
    }
    setBranchId(id);

    const b = branchesStore.branches?.find(x => x.id === id);
    const r = reposStore.repos.find(x => x.id === b?.repositoryId);
    navigate(`/${r?.id!}/${b?.id}`, { replace: true });
  };

  useEffect(() => {
    if (!branchId) {
      const id = branchesStore.branches?.at(0)?.id;
      handleBranchId(id);
    }
  }, [branchesStore.branches]);
  return (
    <Stack gap="5px" direction="row" alignItems="center">
      <FontAwesomeIcon icon={faCodeBranch} />
      <Typography variant="subtitle1">Текущая ветка</Typography>
      <BranchSelector value={branchId} valueChange={handleBranchId} />
    </Stack>
  );
};

export default observer(AppBarBranchSelector);

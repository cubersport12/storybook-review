import { observer } from 'mobx-react';
import { useStore } from '@shared/store';
import { useEffect, useState } from 'react';
import { BranchDto } from '@shared/api';
import BranchSelector from '../BranchSelector';
import { useNavigate } from 'react-router-dom';

const AppBarBranchSelector = () => {
  const [branchId, setBranchId] = useState<string | undefined>(undefined);
  const { branchesStore, reposStore } = useStore();
  const navigate = useNavigate();

  const handleBranchId = (id: string | undefined) => {
    setBranchId(id);
    if (!id) {
      return;
    }
    const b = branchesStore.branches.find(x => x.id === id);
    const r = reposStore.repos.find(x => x.id === b?.repositoryId);
    navigate(`${r?.id!}/${b?.id}`, { relative: 'route' });
  };

  useEffect(() => {
    if (!branchId) {
      const id = branchesStore.branches.at(0)?.id;
      handleBranchId(id);
    }
  }, [branchesStore.branches]);
  return <BranchSelector value={branchId} valueChange={handleBranchId} />;
};

export default observer(AppBarBranchSelector);

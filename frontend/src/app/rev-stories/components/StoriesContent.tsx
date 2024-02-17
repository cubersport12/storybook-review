import { Box } from '@mui/material';
import { AppCard } from '@shared/components';
import { DistService, OpenAPI } from '@shared/api';
import { useParams } from 'react-router-dom';

export const StoriesContent = () => {
  const { repoId, branchId } = useParams();
  const url = `${OpenAPI.BASE}/stories-dist/${repoId}/${branchId}/index.html`;
  return <iframe style={{ width: '100%', height: '100%', overflow: 'hidden', border: 'none' }} src={url} />;
};

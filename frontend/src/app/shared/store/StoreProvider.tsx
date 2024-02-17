import { createContext, ReactNode, useContext } from 'react';
import { BranchesStore } from './branches';
import { ReposStore } from './repos';

const store = {
  reposStore: new ReposStore(),
  branchesStore: new BranchesStore()
};

const StoreContext = createContext(store);

export const StoreProvider = ({ children }: { children: ReactNode[] | ReactNode }) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);

type StoreType = keyof typeof store;
export const useStore = () => useContext(StoreContext);

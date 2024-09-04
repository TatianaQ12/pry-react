import { ApiStatus } from '@/types/api/status';
import { Commitee } from '@/types/slices/commiteType';
import { create } from 'zustand';

interface ICommiteeStore {
  status: string
  commitees: Commitee []
  selectedCommitee: Commitee,
  errorMessage: string | undefined
  actions: {
    onVerifying: () => Promise<void>
    changeStatus: (payload: ApiStatus) => void
    onFetchCommitees: (payload: Commitee[] ) => void
    onSelectCommitee: (payload: Commitee ) => void
  }
}

const useCommitee = create<ICommiteeStore>((set) => ({
    status: ApiStatus.FETCHING,
    commitees: [],
    selectedCommitee: {
        id: 0,
        name: '',
        description: '',
        objective: '',
        start_date: '',
        end_date: ''
    },
    errorMessage:  undefined,
    actions: {
        onVerifying: async () => {
          set(state => ({
            ...state,
            status: ApiStatus.FETCHING,
            commitees: state.commitees,
            errorMessage:  undefined
          }))
        },
        onFetchCommitees: async (payload: Commitee []) => {
          set(state => ({
            ...state,
            status: ApiStatus.FETCHED,
            commitees: payload,
            errorMessage: undefined
          }))
        },
        onSelectCommitee: async (payload: Commitee ) => {
          set(state => ({
            ...state,
            status: ApiStatus.FETCHED,
            selectedCommitee: payload,
            errorMessage: undefined
          }))
        },
        changeStatus: async ( payload: ApiStatus) => {
          set(state => ({
            ...state,
            status: payload
          }))
        },
      }

}));

export const useCommiteeStatus = () => useCommitee(state => state.status)
export const useCommiteeList = () => useCommitee(state => state.commitees)
export const useCommiteeErrorMessage = () => useCommitee(state => state.errorMessage)
export const useCommiteeActions = () => useCommitee(state => state.actions)
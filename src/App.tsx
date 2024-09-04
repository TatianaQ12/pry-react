//third party

import { Protected } from "@components/layout/Protected"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { AuthStatus, RoutesMap } from "./types"
import { LayoutClient } from "./components/layout/LayoutClient"
import { Error404 } from "./views/404/Error404"
import { Main } from "./views/Main/Main"
import { LoginView } from "./views/Login/Login"
import { RestrictedRoute } from "./routes"
import { Backdrop } from "@mui/material"
import { useEffect } from "react"
import { useAuthStore } from "./hooks"
import { Loader } from "./components/common/Loader/Loader"
import { RulesPermissions } from "./views/RolesPermissions/RulesPermissions"
import { RulesList } from "./views/RolesPermissions/RulesList"
import { ModulePermissions } from "./views/RolesPermissions/ModulePermissions"
import { useStyleModeStore } from "./hooks/useStyleModeStore"
import { CodeColor } from "./types/colors/colors"
import { Toaster } from 'react-hot-toast';
import { ChargeList } from "./views/Charge/ChargeList"
import { CompanyList } from "./views/Company/CompanyList"
import { CompanyForm } from "./views/Company/CompanyForm"
import { UserList } from "./views/User/UserList"
import { UserForm } from "./views/User/UserForm"
import { ChargeForm } from "./views/Charge/ChargeForm"
import { RRHHList } from "./views/RRHH/RRHHList"
import { RRHHForm } from "./views/RRHH/RRHHForm"
import { AuditList } from "./views/Audit/AuditList"
import { AuditForm } from "./views/Audit/AuditForm"
import { RulesForm } from "./views/RolesPermissions/RulesForm"
import { ModuleForm } from "./views/RolesPermissions/ModuleForm"
import { TableList } from "./views/Table/TableList"
import { CommiteList } from "./views/Commitee/CommiteeList"
import { CommiteCreate } from "./views/Commitee/CommiteeCreate"
import { CommiteeEdit } from "./views/Commitee/CommiteEdit"
import { CommiteeBacklog } from "./views/Commitee/CommiteeBacklog"
import { CommiteQuiz } from "./views/Commitee/CommiteQuiz"
import { ViewForm } from "./views/View/ViewForm"
import { ViewList } from "./views/View/ViewList"
import { ContractList } from "./views/Contract/ContractList"
import { ContractForm } from "./views/Contract/ContractForm"
import { SignedContractList } from "./views/SignedContract/SignedContractList"
import { SignedContractForm } from "./views/SignedContract/SignedContractForm"
import { QuizList } from "./views/Quiz/QuizList"
import { QuizForm } from "./views/Quiz/QuizForm"
import { QuizCompleteForm } from "./views/Quiz/QuizCompleteForm"
import { QuizCompleteList } from "./views/Quiz/QuizCompleteList"
import { ComplaintChannelList } from "./views/ComplaintChannel/ComplaintChannelList"
import { ComplaintForm } from "./views/Complaint/ComplaintForm"
import { ComplaintPublic } from "./views/ComplaintChannel/ComplaintPublic"
import { ComplaintChannelFollow } from "./views/ComplaintChannel/ComplaintChannelFollow"
import { ComplaintList } from "./views/Complaint/ComplaintList"
import { ComplaintDetail } from "./views/Complaint/ComplaintDetail"
import { TypeComplaintList } from "./views/TypeComplaint/TypeComplaintList"
import { TypeComplaintForm } from "./views/TypeComplaint/TypeComplaintForm"
import { ComplaintChannelForm } from "./views/ComplaintChannel/ComplaintChannelForm"
import { InitialObjectiveList } from "./views/InitialObjective/InitialObjectiveList"
import { InitialObjectiveForm } from "./views/InitialObjective/InitialObjectiveForm"
import { InitialTaskList } from "./views/InitialTask/InitialTaskList"
import { InitialTaskForm } from "./views/InitialTask/InitialTaskForm"

function App() {

  //Hooks
  const { verifySession, status } = useAuthStore()
  const { modeStyle } = useStyleModeStore()
  const location = useLocation()

  useEffect(() => {
    // verifySession()
  }, [])



  if (status === AuthStatus.VERIFYING) {
    return <Backdrop open={true} sx={{ backgroundColor: modeStyle === 'light' ? CodeColor.BACKDROP_LIGHT : CodeColor.BACKDROP_DARK }}>
      <Loader />
    </Backdrop>
  }

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {
          /* Private Routes */
          status === AuthStatus.NOT_AUTHENTICATED
            ?
            <>
              {/* Public Routes */}
              <Route path={RoutesMap.LOGIN} element={<LoginView />} />
              <Route path={RoutesMap.COMPLAINT_PUBLIC} element={<ComplaintPublic />} />

              <Route path="/" element={<LayoutClient />}>
                {/* <Route path="/*" element={<Navigate to={RoutesMap.LOGIN} replace />} /> */}
                <Route path={RoutesMap.MAIN} element={<Main />} />
              </Route>
            </>
            :
            (
              <Route path="/" element={<Protected />}>
                <Route path={RoutesMap._404} element={<Error404 />} />
                <Route element={<RestrictedRoute pathRequired={RoutesMap.MAIN} />}>
                  <Route path={RoutesMap.MAIN} element={<Main />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.RULES} />}>
                  <Route path={RoutesMap.RULES} element={<RulesPermissions />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.RULES_LIST} />}>
                  <Route path={RoutesMap.RULES_LIST} element={<RulesList />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.RULES_FORM} />}>
                  <Route path={RoutesMap.RULES_FORM} element={<RulesForm />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.MODULE_LIST} />}>
                  <Route path={RoutesMap.MODULE_LIST} element={<ModulePermissions />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.MODULE_FORM} />}>
                  <Route path={RoutesMap.MODULE_FORM} element={<ModuleForm />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.EMPRESAS} />}>
                  <Route path={RoutesMap.EMPRESAS} element={<CompanyList />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.EMPRESAS_FORM} />}>
                  <Route path={RoutesMap.EMPRESAS_FORM} element={<CompanyForm />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.CHARGE_LIST} />}>
                  <Route path={RoutesMap.CHARGE_LIST} element={<ChargeList />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.USERS_LIST} />}>
                  <Route path={RoutesMap.USERS_LIST} element={<UserList />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.USERS_FORM} />}>
                  <Route path={RoutesMap.USERS_FORM} element={<UserForm />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.CHARGE_FORM} />}>
                  <Route path={RoutesMap.CHARGE_FORM} element={<ChargeForm />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.RRHH_LIST} />}>
                  <Route path={RoutesMap.RRHH_LIST} element={<RRHHList />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.RRHH_FORM} />}>
                  <Route path={RoutesMap.RRHH_FORM} element={<RRHHForm />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.AUDIT_LIST} />}>
                  <Route path={RoutesMap.AUDIT_LIST} element={<AuditList />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.AUDIT_FORM} />}>
                  <Route path={RoutesMap.AUDIT_FORM} element={<AuditForm />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.TABLE} />}>
                  <Route path={RoutesMap.TABLE} element={<TableList />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.CONTRACT_LIST} />}>
                  <Route path={RoutesMap.CONTRACT_LIST} element={<ContractList />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.CONTRACT_FORM} />}>
                  <Route path={RoutesMap.CONTRACT_FORM} element={<ContractForm />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.SIGNED_CONTRACT_LIST} />}>
                  <Route path={RoutesMap.SIGNED_CONTRACT_LIST} element={<SignedContractList />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.SIGNED_CONTRACT_FORM} />}>
                  <Route path={RoutesMap.SIGNED_CONTRACT_FORM} element={<SignedContractForm />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.VIEW_LIST} />}>
                  <Route path={RoutesMap.VIEW_LIST} element={<ViewList />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.VIEW_FORM} />}>
                  <Route path={RoutesMap.VIEW_FORM} element={<ViewForm />} />
                </Route>

                <Route element={<RestrictedRoute pathRequired={RoutesMap.COMMITE_LIST} />}>
                  <Route path={RoutesMap.COMMITE_LIST} element={<CommiteList />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.COMMITE_CREATE} />}>
                  <Route path={RoutesMap.COMMITE_CREATE} element={<CommiteCreate />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.COMMITE_EDIT} />}>
                  <Route path={RoutesMap.COMMITE_EDIT} element={<CommiteeEdit />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.COMMITE_BACKLOG} />}>
                  <Route path={RoutesMap.COMMITE_BACKLOG} element={<CommiteeBacklog />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.COMMITE_QUIZ} />}>
                  <Route path={RoutesMap.COMMITE_QUIZ} element={<CommiteQuiz />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.QUIZ_LIST} />}>
                  <Route path={RoutesMap.QUIZ_LIST} element={<QuizList />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.QUIZ_FORM} />}>
                  <Route path={RoutesMap.QUIZ_FORM} element={<QuizForm />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.QUIZ_COMPLETE_LIST} />}>
                  <Route path={RoutesMap.QUIZ_COMPLETE_LIST} element={<QuizCompleteList />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.QUIZ_COMPLETE_FORM} />}>
                  <Route path={RoutesMap.QUIZ_COMPLETE_FORM} element={<QuizCompleteForm />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.COMPLAINT_CHANNEL_LIST} />}>
                  <Route path={RoutesMap.COMPLAINT_CHANNEL_LIST} element={<ComplaintChannelList />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.COMPLAINT_CHANNEL_FORM} />}>
                  <Route path={RoutesMap.COMPLAINT_CHANNEL_FORM} element={<ComplaintChannelForm />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.COMPLAINT_DETAIL} />}>
                  <Route path={RoutesMap.COMPLAINT_DETAIL} element={<ComplaintDetail />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.COMPLAINT_FORM} />}>
                  <Route path={RoutesMap.COMPLAINT_FORM} element={<ComplaintForm />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.COMPLAINT_PUBLIC} />}>
                  <Route path={RoutesMap.COMPLAINT_PUBLIC} element={<ComplaintPublic />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.COMPLAINT_FOLLOW} />}>
                  <Route path={RoutesMap.COMPLAINT_FOLLOW} element={<ComplaintChannelFollow />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.COMPLAINT_LIST} />}>
                  <Route path={RoutesMap.COMPLAINT_LIST} element={<ComplaintList />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.TYPE_COMPLAINT_LIST} />}>
                  <Route path={RoutesMap.TYPE_COMPLAINT_LIST} element={<TypeComplaintList />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.TYPE_COMPLAINT_FORM} />}>
                  <Route path={RoutesMap.TYPE_COMPLAINT_FORM} element={<TypeComplaintForm />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.INITIAL_OBJECTIVE_LIST} />}>
                  <Route path={RoutesMap.INITIAL_OBJECTIVE_LIST} element={<InitialObjectiveList />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.INITIAL_OBJECTIVE_FORM} />}>
                  <Route path={RoutesMap.INITIAL_OBJECTIVE_FORM} element={<InitialObjectiveForm />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.INITIAL_TASK_LIST} />}>
                  <Route path={RoutesMap.INITIAL_TASK_LIST} element={<InitialTaskList />} />
                </Route>
                <Route element={<RestrictedRoute pathRequired={RoutesMap.INITIAL_TASK_FORM} />}>
                  <Route path={RoutesMap.INITIAL_TASK_FORM} element={<InitialTaskForm />} />
                </Route>
                <Route path="/*" element={<Navigate to={RoutesMap._404} state={{ from: location }} replace />} />
              </Route>
            )
        }
      </Routes>
    </div>
  )
}

export default App

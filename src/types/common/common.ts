export enum RoutesMap {
  HOME = '/',
  MAIN = '/principal',
  // LOGIN           = '/login/:type',
  LOGIN = '/login',
  PERFIL = '/perfil',
  CONFIGURACION = '/configuracion',
  USER = '/usuarios',

  //VISTAS / ROLES Y PERMISOS
  RULES = '/views-permissions/rules',
  RULES_LIST = '/views-permissions/rules/list',
  RULES_FORM = '/views-permissions/rules/form',
  MODULE_LIST = '/views-permissions/module/list',
  MODULE_FORM = '/views-permissions/module/form',

  //EMPRESAS 
  EMPRESAS = '/empresas',
  EMPRESAS_FORM = '/empresas/form',

  //USUARIOS

  USERS_LIST = '/usuarios/list',
  USERS_FORM = '/usuarios/form',

  //CARGOS
  CHARGE_LIST = '/charge/list',
  CHARGE_FORM = '/charge/form',

  //RRHH
  RRHH_LIST = '/rrhh/list',
  RRHH_FORM = '/rrhh/form',

  //AUDITOR
  AUDIT_LIST = '/audit/list',
  AUDIT_FORM = '/audit/form',

  //TABLERO
  TABLE = '/table',

  //VISTAS
  VIEW_LIST = '/view/list',
  VIEW_FORM = '/view/form',

  //CONTRATOS
  CONTRACT_LIST = '/contract/list',
  CONTRACT_FORM = '/contract/form',

  //ASIGNAR CONTRATO
  SIGNED_CONTRACT_LIST = '/contract/signed/list',
  SIGNED_CONTRACT_FORM = '/contract/signed/form',
  //COMMITEE
  COMMITE_LIST = '/commitee/list',
  COMMITE_CREATE = '/commitee/create',
  COMMITE_EDIT = '/commitee/edit',
  COMMITE_BACKLOG = '/commitee/backlog/:id',
  COMMITE_QUIZ = '/commitee/quiz',

  //QUIZ
  QUIZ_LIST = '/quiz/list',
  QUIZ_FORM = '/quiz/form',
  QUIZ_COMPLETE_LIST = '/quiz/complete/list',
  QUIZ_COMPLETE_FORM = '/quiz/complete/form',

  //CANAL DE DENUNCIA
  COMPLAINT_CHANNEL_LIST = '/complaint-channel/list',
  COMPLAINT_CHANNEL_FORM = '/complaint-channel/form',
  COMPLAINT_FORM = '/complaint/form',
  COMPLAINT_PUBLIC = '/complaint-public',
  COMPLAINT_FOLLOW = '/complaint/follow',

  //DENUNCIAS
  COMPLAINT_LIST = '/complaint/list/:id',
  COMPLAINT_DETAIL = '/complaint/detail/:id',

  //TIPOS DE DENUNCIA
  TYPE_COMPLAINT_LIST = '/type-complaint/list',
  TYPE_COMPLAINT_FORM = '/type-complaint/form',

  //OBJETIVOS INICIALES
  INITIAL_OBJECTIVE_LIST = '/initial-objective/list',
  INITIAL_OBJECTIVE_FORM = '/initial-objective/form',

  //TAREAS INICIALES
  INITIAL_TASK_LIST = '/initial-task/list/:id',
  INITIAL_TASK_FORM = '/initial-task/form/:id',

  //Unknow
  _404 = '/404'
}

export type HeadCell = {
  id: string;
  numeric: boolean;
  label: string;
  disablePadding?: string | boolean | undefined;
  align?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
};

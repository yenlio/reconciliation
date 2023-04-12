/*
author:sangle
desc: Define API endpoints
date: 12/08/2022
 */
export const API = {
  API_RECONCILIATION: {
    GET_PARTNERS: 'comparison/partnerCode',
    GET_SERVICE_TYPES: 'comparison/serviceType',
    GET_RECONCILIATIONS: 'comparison/summary',
    GET_RECONCILIATION_PARTNER: 'reconsider/details',
    GET_STATUS_RECONCILIATION: 'comparison/statusDetails',
    UPDATE_RECONCILIATIONS_NAPAS: 'comparison/updateReconsEpayNapas',
    UPDATE_RECONCILIATIONS_ACV: 'reconsider/updateReconsEpayACV',
    GET_SUMMARY_ACCT_FILE: 'comparison/summaryAcctFile',
    LOGIN: 'auth/signin',
    EXPORT_REPORT: 'report/getFileReport',
    GET_ROLES: 'auth/roles',
    GET_ROLES_BY_ID: 'auth/roles',
    ADD_ROLES: 'auth/roles',
    DELETE_ROLES: 'auth/roles',
    GET_PERMISSION: 'auth/permission',
    ADD_PERMISSION: 'auth/permission',
    GEN_OTP: 'access/genOtp',
    CONFIRM_OTP: 'access/confirmOtp',
    CREATE_PASSWORD: 'access/createPassword',
    USER: 'users',
    SAVE_USER: 'users/createOrUpdate',
    UPDATE_USER: 'users/createOrUpdate',
    GET_USER: 'users/getListUser',
    DELETE_USER: 'createOrUpdate',
    VALIDATE_USER:'users/validateUser'
  },
};

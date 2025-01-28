import { AppMsgCode, AppMsgType } from 'cat-shared/utils/index'

export default {
  [AppMsgCode.SomethingWentWrong]: {
    code: AppMsgCode.SomethingWentWrong,
    type: AppMsgType.Error,
  },
  [AppMsgCode.AuthenticationFailed]: {
    code: AppMsgCode.AuthenticationFailed,
    type: AppMsgType.Error,
  },
  [AppMsgCode.NoCredentialsProvided]: {
    code: AppMsgCode.NoCredentialsProvided,
    type: AppMsgType.Error,
  },
  [AppMsgCode.TokenExpired]: {
    code: AppMsgCode.TokenExpired,
    type: AppMsgType.Error,
  },
  [AppMsgCode.NoSuchUser]: {
    code: AppMsgCode.NoSuchUser,
    type: AppMsgType.Error,
  },
  [AppMsgCode.NoSuchQuestion]: {
    code: AppMsgCode.NoSuchQuestion,
    type: AppMsgType.Error,
  },
  [AppMsgCode.EmailNotConfirmed]: {
    code: AppMsgCode.EmailNotConfirmed,
    type: AppMsgType.Error,
  },
  [AppMsgCode.NotFullAccount]: {
    code: AppMsgCode.NotFullAccount,
    type: AppMsgType.Error,
  },
  [AppMsgCode.IllegalAction]: {
    code: AppMsgCode.IllegalAction,
    type: AppMsgType.Error,
  },
  [AppMsgCode.ActivationLinkSent]: {
    code: AppMsgCode.ActivationLinkSent,
    type: AppMsgType.Info,
  },
  [AppMsgCode.DeactivationLinkSent]: {
    code: AppMsgCode.DeactivationLinkSent,
    type: AppMsgType.Info,
  },
  [AppMsgCode.RecoveryLinkSent]: {
    code: AppMsgCode.RecoveryLinkSent,
    type: AppMsgType.Info,
  },
  [AppMsgCode.PasswordUpdated]: {
    code: AppMsgCode.PasswordUpdated,
    type: AppMsgType.Success,
  },
  [AppMsgCode.PasswordRecovered]: {
    code: AppMsgCode.PasswordRecovered,
    type: AppMsgType.Success,
  },
  [AppMsgCode.AvatarUpdated]: {
    code: AppMsgCode.AvatarUpdated,
    type: AppMsgType.Success,
  },
  [AppMsgCode.UserDetailsUpdated]: {
    code: AppMsgCode.UserDetailsUpdated,
    type: AppMsgType.Success,
  },
  [AppMsgCode.EmailAlreadyConfirmed]: {
    code: AppMsgCode.EmailAlreadyConfirmed,
    type: AppMsgType.Error,
  },
  [AppMsgCode.EmailConfirmed]: {
    code: AppMsgCode.EmailConfirmed,
    type: AppMsgType.Success,
  },
  [AppMsgCode.AccountRemoved]: {
    code: AppMsgCode.AccountRemoved,
    type: AppMsgType.Success,
  },
  [AppMsgCode.PaymentAlreadyMade]: {
    code: AppMsgCode.PaymentAlreadyMade,
    type: AppMsgType.Error,
  },
  [AppMsgCode.CouldNotGetData]: {
    code: AppMsgCode.CouldNotGetData,
    type: AppMsgType.Error,
  },
  [AppMsgCode.QuestionAlreadyFollowed]: {
    code: AppMsgCode.QuestionAlreadyFollowed,
    type: AppMsgType.Error,
  },
  [AppMsgCode.QuestionAlreadyUnfollowed]: {
    code: AppMsgCode.QuestionAlreadyUnfollowed,
    type: AppMsgType.Error,
  },
  [AppMsgCode.QuestionDeleted]: {
    code: AppMsgCode.QuestionDeleted,
    type: AppMsgType.Success,
  },
  [AppMsgCode.QuestionMustHaveBeenDeleted]: {
    code: AppMsgCode.QuestionMustHaveBeenDeleted,
    type: AppMsgType.Error,
  },
  [AppMsgCode.QuestionCreated]: {
    code: AppMsgCode.QuestionCreated,
    type: AppMsgType.Success,
  },
  [AppMsgCode.QuestionReported]: {
    code: AppMsgCode.QuestionReported,
    type: AppMsgType.Success,
  },
  [AppMsgCode.QuestionAlreadyReported]: {
    code: AppMsgCode.QuestionAlreadyReported,
    type: AppMsgType.Error,
  },
  [AppMsgCode.QuestionFollowed]: {
    code: AppMsgCode.QuestionFollowed,
    type: AppMsgType.Success,
  },
  [AppMsgCode.QuestionUnfollowed]: {
    code: AppMsgCode.QuestionUnfollowed,
    type: AppMsgType.Success,
  },
} as Record<
  AppMsgCode,
  {
    code: AppMsgCode
    type: AppMsgType
  }
>

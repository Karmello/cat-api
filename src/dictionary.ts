import { Lang } from 'cat-shared/utils/index'

const dict = {
  errors: {
    authFailed: 'Authentication failed',
    alreadyTaken: 'Is already taken',
    noSuchUser: 'No such user',
    somethingWentWrong: 'Something went wrong',
    notFound: 'Not found',
    isIncorrect: 'Is incorrect',
    couldNotGetData: 'Could not get data',
    alreadyConfirmed: 'Already confirmed',
  },
  successes: {
    passwordUpdated: 'Password updated',
    userDetailsUpdated: 'User details updated',
    avatarUploaded: 'Avatar uploaded',
  },
  infos: {
    recoveryLinkSent:
      'The password recovery link has been sent to you. Please check your mailbox.',
    activationLinkSent:
      'The verification link has been sent to you. Please check your mailbox.',
    deactivationLinkSent:
      'The deactivation link has been sent to you. Please check your mailbox.',
  },
  email: {
    footerText: '"Can Answer That ?" app wishes you a great day !',
    activation: {
      subject: '"Can Answer That ?" - account verification',
      text: 'Use this button to verify your email and activate the account for',
      btnText: 'Verify',
      emailConfirmed: 'Your email address has been confirmed. You can close this window.',
    },
    deactivation: {
      subject: '"Can Answer That ?" - account deactivation',
      text: 'Use this button to deactivate the account for',
      btnText: 'Deactivate',
      accountDeactivatedMsg:
        'Your account has been completely deactivated. You can close this window.',
    },
    passwordRecovery: {
      subject: '"Can Answer That ?" - password recovery',
      text: 'Use this button to enable password update for',
      btnText: 'Enable',
      enterNewPassword:
        'You can now close this window, go back to the app and enter your new password.',
    },
  },
  [Lang.EN]: {
    noSuchUser: 'No such user.',
    emailAlreadyConfirmed: 'Email already confirmed.',
    somethingWentWrong: 'Something went wrong.',
  },
}

export default dict

export enum UnexpectedServerErrorsNames {
  SERVER_400 = 'server400',
  SERVER_403 = 'server403',
  SERVER_404 = 'server404',
  SERVER_405 = 'server405',
  SERVER_500 = 'server500',
  SERVER_502 = 'server502',
  SERVER_504 = 'server504'
}

export enum UnexpectedServerErrorsMessages {
  TRY_LATER = 'Пожалуйста, повторите попытку входа через несколько минут',
  CONTACT_TECH_SUPPORT = 'К несчастью, сейчас мы не можем обработать ваш запрос. \n ' +
    'Обратитесь в техподдержку. Email для связи: hello@skillbox.ru',
  BACK_LATER = 'К несчастью, сейчас мы не можем обработать ваш запрос. \n' +
    ' Возвращайтесь к нам буквально через 5 минут',
  ALREADY_REGISTERED = 'Пользователь уже зарегистрирован',
  INCORRECT_DATA = 'Неверные учётные данные'
}

export const unexpectedServerErrorsEntries: { [key: string]: string } = {
  [UnexpectedServerErrorsNames.SERVER_400]:
    UnexpectedServerErrorsMessages.INCORRECT_DATA,
  [UnexpectedServerErrorsNames.SERVER_403]:
    UnexpectedServerErrorsMessages.ALREADY_REGISTERED,
  [UnexpectedServerErrorsNames.SERVER_404]:
    UnexpectedServerErrorsMessages.CONTACT_TECH_SUPPORT,
  [UnexpectedServerErrorsNames.SERVER_405]:
    UnexpectedServerErrorsMessages.CONTACT_TECH_SUPPORT,
  [UnexpectedServerErrorsNames.SERVER_500]:
    UnexpectedServerErrorsMessages.CONTACT_TECH_SUPPORT,
  [UnexpectedServerErrorsNames.SERVER_502]:
    UnexpectedServerErrorsMessages.CONTACT_TECH_SUPPORT,
  [UnexpectedServerErrorsNames.SERVER_504]:
    UnexpectedServerErrorsMessages.BACK_LATER
};

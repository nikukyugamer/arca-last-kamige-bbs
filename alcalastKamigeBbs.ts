import { getMessages } from './messages'
import { prismaAction } from './database'

class AlcalastKamigeBbs {
  constructor() {
    getMessages()
  }

  execute() {
    prismaAction()
  }
}

const alcalastBbsAction = new AlcalastKamigeBbs()
alcalastBbsAction.execute()

import { getComments } from './getComments'
import { prismaAction } from './database'

class AlcalastKamigeBbs {
  constructor() {
    getComments()
  }

  execute() {
    prismaAction()
  }
}

const alcalastBbsAction = new AlcalastKamigeBbs()
alcalastBbsAction.execute()

import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/newAccount/TermsAndConditionsScreenComponent'
import * as actions from '../../../../common/actions/'

export const mapStateToProps = (state, ownProps) => {
  // TODO link to the terms of service.
  const hiltTerms = [
    {
      title: `I understand and agree to Hilt's <a href="https://www.hiltventures.com/privacy-policy">Privacy Policy</a>.`
    },
    {
      title: `I understand and agree to Hilt's terms of service.`
    }
  ]
  const terms = state.terms.concat(hiltTerms);
  return {
    styles: ownProps.styles,
    workflow: state.workflow,
    accountObject: state.create.accountObject,
    terms: state.terms
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    agreeToCondition: data => dispatch(actions.agreeToConditions(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)

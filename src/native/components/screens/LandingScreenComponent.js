import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { BackgroundImage, Button } from '../common'
import * as Constants from '../../../common/constants'
import * as Assets from '../../assets/'
import { LogoImageHeader } from '../abSpecific'
export default class LandingScreenComponent extends Component {
  render () {
    const { LandingScreenStyle } = this.props.styles
    return (
      <View style={LandingScreenStyle.container}>
        this.renderOverImage()
      </View>
    )
  }
  renderOverImage () {
    const { LandingScreenStyle } = this.props.styles
    return (
      <View style={LandingScreenStyle.inner}>
        <View style={LandingScreenStyle.featureBox}>
          <LogoImageHeader style={LandingScreenStyle.logoHeader} />
          <View style={LandingScreenStyle.featureBoxContent}>
            <View style={LandingScreenStyle.featureBoxDescription}>
              <Text style={LandingScreenStyle.tagText}>
                {
                  'The easiest and cheapest way to buy and sell Cryptocurrency using cash'
                }
              </Text>
            </View>
          </View>
          <View style={LandingScreenStyle.featureBoxButtons}>
            <Button
              onPress={this.onStartCreate.bind(this)}
              label={'Create account and unlock your Hilt Club membership benefits'}
              downStyle={LandingScreenStyle.createButton.downStyle}
              downTextStyle={LandingScreenStyle.createButton.downTextStyle}
              upStyle={LandingScreenStyle.createButton.upStyle}
              upTextStyle={LandingScreenStyle.createButton.upTextStyle}
            />
            <View style={LandingScreenStyle.shim} />
            <Button
              testID={'alreadyHaveAccountButton'}
              onPress={this.onStartLogin.bind(this)}
              label={'Already have an account? Sign in'}
              downStyle={LandingScreenStyle.loginButton.downStyle}
              downTextStyle={LandingScreenStyle.loginButton.downTextStyle}
              upStyle={LandingScreenStyle.loginButton.upStyle}
              upTextStyle={LandingScreenStyle.loginButton.upTextStyle}
            />
          </View>
        </View>
      </View>
    )
  }
  onStartCreate () {
    this.props.startFlow(Constants.WORKFLOW_CREATE)
  }

  onStartLogin () {
    this.props.startFlow(Constants.WORKFLOW_PASSWORD)
  }
}

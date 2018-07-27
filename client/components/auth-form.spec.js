import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'
import sinon from 'sinon'
import AuthForm from './auth-form'
const adapter = new Adapter()
enzyme.configure({adapter})

describe('AuthForm', () => {
  let authForm, submitSpy

  beforeEach(() => {
    submitSpy = sinon.spy()
    authForm = shallow(
      <AuthForm displayName="Login" name="Tom" submit={submitSpy} />
    )
  })

  it('submits properForm', () => {
    const form = authForm.find('form')
    form.simulate('submit')
    expect(submitSpy.called).to.be.true
  })
})

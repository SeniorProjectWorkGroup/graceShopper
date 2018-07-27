import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {spy} from 'sinon'
import Provider from 'react-redux'
import AddProductForm from './AddProductForm'
import store from '../../store'
const adapter = new Adapter()
enzyme.configure({adapter})

describe('AddProductForm', () => {
  let addForm
  let submitSpy = spy()

  beforeEach(() => {
    addForm = shallow(<AddProductForm submitProduct={submitSpy} />)
  })
  it('dispatches a formSubmission on form Submit', () => {
    const form = addForm.find('form')
    console.log('Form', form)
    form.simulate('submit')
    expect(submitSpy.called).to.be.true
  })
})

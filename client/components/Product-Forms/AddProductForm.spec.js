import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon, {spy} from 'sinon'
import {AddProductForm} from './AddProductForm'
import history from '../../history'
const adapter = new Adapter()
enzyme.configure({adapter})

describe.only('AddProductForm', () => {
  let addForm
  let submitSpy = sinon.spy()

  beforeEach(() => {
    addForm = shallow(
      <AddProductForm history={history} submitProduct={submitSpy} />
    )
  })
  it('dispatches a formSubmission on form Submit', () => {
    const form = addForm.find('form')
    console.log('Form', form)
    const fakeEvent = {preventDefault: () => console.log('preventDefault')}
    form.simulate('submit', fakeEvent)
    expect(submitSpy.called).to.be.true
  })
})

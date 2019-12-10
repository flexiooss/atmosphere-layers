import {ValueObjectValidator, StringValidator, NumberValidator} from '@flexio-oss/js-validator-helper'

export class ChangeLayerOrderValidator extends ValueObjectValidator {
  /**
   *
   * @param  {ChangeLayerOrder} object
   * @return {boolean}
   */
  isValid(object) {
    return new StringValidator().validateNotEmpty(object.id()) && new NumberValidator().validateNotNull(object.order())
  }
}

import {ValueObjectValidator, StringValidator} from '@flexio-oss/js-validator-helper'

export class RemoveLayerValidator extends ValueObjectValidator {
  /**
   *
   * @param  {RemoveLayer} object
   * @return {boolean}
   */
  isValid(object) {
    return new StringValidator().validateNotEmpty(object.id())
  }
}

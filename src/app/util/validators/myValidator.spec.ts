import { MyValidators } from './myValidator';

describe('MyValidators', () => {
  it('isValueValid() != number', () => {
    const valid = MyValidators.isValueValid({ value: 'ssa' } as any)
    expect(valid).toEqual({value_invalid: true})
  });
  it('isValueValid() < 0', () => {
    const valid = MyValidators.isValueValid({ value: -1 } as any)
    expect(valid).toEqual({value_invalid: true})
  });
  it('isValueValid()', () => {
    const valid = MyValidators.isValueValid({ value: 5 } as any)
    expect(valid).toEqual(null)
  });
  
  describe('isDateValid', () => {
    it('isDateValid == string', () => {
      const valid = MyValidators.isDateValid({value: 'ssa'} as any);
      expect(valid).toEqual({date_invalid: true});
    });

    it('isDateValid == null', () => {
      const valid = MyValidators.isDateValid({value: null} as any);
      expect(valid).toEqual({date_invalid: true});
    });

    it('isDateValid < Date', () => {
      const valid = MyValidators.isDateValid({value : new Date(Date.UTC(2020, 1, 1))} as any);
      expect(valid).toEqual({date_invalid : true});
    })

    it('masterParamsValid value include "."', () => {
      const valid = MyValidators.masterParamsValid({value : '1.3'} as any);
      expect(valid).toEqual({param_point_invalid : true});
    })

    it('masterParamsValid value include "," and letter', () => {
      const valid = MyValidators.masterParamsValid({value : '1,3h'} as any);
      expect(valid).toEqual({param_nan_invalid : true});
    })

    it('masterParamsValid include good value ', () => {
      const valid = MyValidators.masterParamsValid({value : '1,3'} as any);
      expect(valid).toEqual(null);
    })
  })
});

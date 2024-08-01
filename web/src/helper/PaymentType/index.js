export function FirstCapital(payment) {
  if (payment == 'NOTCASHORCREDIT') return 'Other';

  let element = payment;
  let elementToArr = element.split('');

  let tmp = [];

  for (let i = 0; i < elementToArr.length; i++) {
    if (i == 0) {
      tmp.push(elementToArr[i]);
    } else {
      tmp.push(elementToArr[i].toLowerCase());
    }
  }

  return tmp.join('');
}

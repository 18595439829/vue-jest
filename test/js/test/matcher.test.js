// const sum = require("../code/sum.js");

// test("adds 1 + 2 to equal 3", () => {
//   expect(sum(1, 2)).toBe(3);
// });

// ----------------------------------------------------------

// test("two plus two is four", () => {
//   expect(2 + 2).toBe(4);
// });

// ----------------------------------------------------------

// function compileAndroidCode() {
//   throw new Error('you are using the wrong JDK');
// }

// test('compiling android goes as expected', () => {
//   expect(compileAndroidCode).toThrow();
//   expect(compileAndroidCode).toThrow(Error);

//   // You can also use the exact error message or a regexp
//   expect(compileAndroidCode).toThrow('you are using the wrong JDK');
//   expect(compileAndroidCode).toThrow(/JDK/);
// });

// ----------------------------------------------------------

// function fetchData(callback) {
//   setTimeout(() => {
//     callback('peanut butter');
//   },2000)
// }

// test('the data is peanut butter', done => {
//   function callback(data) {
//     try {
//       expect(data).toBe('peanut butter');
//       done();
//     } catch (error) {
//       done(error);
//     }
//   }
//   fetchData(callback);
// });

// ----------------------------------------------------------

// let arr = Array(10000).fill('aaa');

// function arrForEach(done) {
//   try {
//     arr.forEach(item => {
//       return
//     })
//     done();
//   } catch (error) {
//     done(error);
//   }
// }

// test('数组遍历完成', done => {
//     arrForEach(done);
// })

/*
 Testing Asynchronous Code
 */

// function fetchData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       try {
//         resolve('peanut butter')
//       } catch(e) {
//         reject(e)
//       }
//     }, 1000)
//   });
// }

// test('the data is peanut butter', async () => {
//   const data = await fetchData();
//   expect(data).toBe('peanut butter');
// });

// test('the fetch fails with an error', async () => {
//   // expect.assertions(1);
//   try {
//     await fetchData();
//   } catch (e) {
//     expect(e).toMatch('error');
//   }
// });

// test('the data is peanut butter', async () => {
//   await expect(fetchData()).resolves.toBe('peanut butter');
// });

// test('the fetch fails with an error', async () => {
//   await expect(fetchData()).rejects.toThrow('error');
// });

/* 
  Setup and Teardown
*/
// function beforeFn() {
//   return new Promise((resolve, reject) => {
//     try {
//       resolve('before')
//     } catch(e) {
//       reject(e)
//     }
//   })
// }

// function afterFn() {
//   return new Promise((resolve, reject) => {
//     try {
//       resolve('after')
//     } catch(e) {
//       reject(e)
//     }
//   })
// }

// beforeEach(() => {
//   beforeFn();
// });

// afterEach(() => {
//   afterFn();
// });

// function isBeforeOrAfter(str) {
//   let strs = 'before,after'
//   if ( strs.indexOf(str) !== -1) {
//     return true
//   }
//   return false
// }

// test('beforeFn is called', () => {
//   expect(isBeforeOrAfter('before')).toBeTruthy();
// });

// test('afterFn is called', () => {
//   expect(isBeforeOrAfter('after')).toBeTruthy();
// });

//--------------------------------------------------

// describe('outer', () => {
//   console.log('describe outer-a');

//   describe('describe inner 1', () => {
//     console.log('describe inner 1');
//     function timer() {
//       return new Promise((resolve, reject) => {
//         try {
//           resolve(true)
//         } catch(__) {
//           reject(false)
//         }
//       })
//     }
//     test('test 1', async () => {
//       await expect(timer()).toEqual(true);
//     });
//   });

//   console.log('describe outer-b');

//   test('test 1', () => {
//     console.log('test for describe outer');
//     expect(true).toEqual(true);
//   });

//   describe('describe inner 2', () => {
//     console.log('describe inner 2');
//     test('test for describe inner 2', () => {
//       console.log('test for describe inner 2');
//       expect(false).toEqual(false);
//     });
//   });

//   console.log('describe outer-c');
// });

/*
Mock Functions
*/

// function forEach(items, callback) {
//   for (let index = 0; index < items.length; index++) {
//     callback(items[index]);
//   }
// }

// const mockCallback = jest.fn(x => 42 + x);
// forEach([0, 1], mockCallback);

// test("此 mock 函数被调用了两次此 mock 函数被调用了两次", () => {
//   // 此 mock 函数被调用了两次
//   expect(mockCallback.mock.calls.length).toBe(2);
// });
// test("第一次调用函数时的第一个参数是 0", () => {
//   // 第一次调用函数时的第一个参数是 0
//   expect(mockCallback.mock.calls[0][0]).toBe(0);
// });

// test("第二次调用函数时的第一个参数是 1", () => {
//   // 第二次调用函数时的第一个参数是 1
//   expect(mockCallback.mock.calls[1][0]).toBe(1);
// });

// test("第一次函数调用的返回值是 42", () => {
//   // 第一次函数调用的返回值是 42
//   expect(mockCallback.mock.results[0].value).toBe(42);
// });

//-------------------------------------------------------------

import axios from 'axios';
import Users from '../code/user.js';

jest.mock('axios');

test('模拟axios执行', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);
  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  return Users.get().then(data => expect(data).toEqual(users));
});
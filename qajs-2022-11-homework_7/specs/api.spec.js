//import supertest from "supertest";
import user from "../framework/services/user";
import auth from "../framework/services/auth";
import { createUser } from "../framework/fixtures/userFixture";


// //тесты с урока
// test('Успешная авторизация с правильным логином и паролем', async () =>{
// const res = await user.login(config.credentials)
// expect(res.status).toBe(200)
// expect(typeof res.body.token).toEqual('string')
// });

// test('Авторизация возвращает статус ошибки. если логин не верный', async () =>{
//   const res = await user.login({username:"demo4", password:"demo"});
//   expect(res.status).toEqual(412);
//   expect(res.body.code).toEqual(1011);
// });

// test('Авторизация возвращает статус ошибки. если пароль не верный', async () =>{
//   const res = await user.login({username:"demo", password:"demo3"});
//   expect(res.status).toEqual(412);
//   expect(res.body.code).toEqual(1011);
// });

//оптимизированные тесты с прошлого урока
// describe("5 test for bookstore", () => {
//   test("создание пользователя c ошибкой, логин уже используется", async () => {
//     const res = await user.newUser({
//       username: "Test",
//       password: "Test123@",
//     });
//     expect(res.status).toBe(406);
//     expect(res.body.code).toBe("1204");
//     expect(res.body.message).toBe("User exists!");
//   });
//   test("Создание пользователя c ошибкой, пароль не подходит", async () => {
//     const res = await user.newUser({
//       username: "limonchik",
//       password: "Tewr",
//     });
//     expect(res.status).toBe(400);
//     expect(res.body.code).toBe("1300");
//     expect(res.body.message).toContain(
//       "Passwords must have at least one non alphanumeric character",
//     );
//   });
//   test("Создание пользователя успешно", async () => {
//     const res = await user.newUser({
//       username: "limonch",
//       password: "Test123@",
//     });
//     expect(res.status).toBe(201);
//     console.log(res.body);
//   });

//домашнее задание №7
describe("Users", () => {
  let token;
  let userId;
  let newOne;


  beforeAll(async () => {
    newOne = createUser;
     });

  test("Авторизован ли пользователь?", async () => {
    const responseCreateUser = await user.newUser(newOne);
    userId = responseCreateUser.body.userID;

    //const { data: authorizedBeforeLogin } = await auth.login(newOne);

    const responseToken = await auth.getAuthToken(newOne);
    token = responseToken.body.token;
    console.log("сгенерировали токен" ,token)


    const { data: authorizedAfterLogin } = await auth.login(newOne);

    //expect(authorizedBeforeLogin).toBe(false);
    expect(authorizedAfterLogin).toBe(true);
  });

  test("Информация о юзере", async () => {
    const response = await user.userInfo({ userId, token });
    expect(response.status).toBe(201);
    return response.data;
  });

  test("Удаление юзера", async () => {
    const response = await user.delUser({ userId, token });
    expect(response.status).toBe(204);
    expect(response.data).toBe("");
  });
});

// test('Успешная авторизация', async () =>{
//   const res = await user.login(config.credentials)
//   expect(res.status).toBe(200)
//   expect(typeof res.body.token).toEqual('string')
//   });

//   test("Информация о юзере", async () => {
//     const res = await user.userInfo(config.userID)
//     expect(res.status).toBe(201);
//     return (res.id);
//   });
// test("Удаление пользователя успешно", async () => {
//   const res = await user.delUser(config.userID)
//   expect(res.status).toBe(201);
//   return (res.message);
// });
// });

// describe("5 test for bookstore", () => {
// test("создание пользователя c ошибкой, логин уже используется", async () => {
//     const response = await createUser('Test','Test123@')
//     const data = await response.json()
//     expect(response.status).toBe(406)
//     expect(data.code).toBe("1204")
//     expect(data.message).toBe("User exists!")
//   });

//     test("Создание пользователя c ошибкой, пароль не подходит", async () => {
//       const response = await createUser('Test','Test@')
//       const data = await response.json()
//       expect(response.status).toBe(400)
//       expect(data.code).toBe('1300')
//       expect(data.message).toContain("Passwords must have at least one non alphanumeric character")
//    });

// test("Создание пользователя успешно", async () => {
//       const response = await createUser('Test_Karpikcvx32456','Test123@')
//       const data = await response.json()
//       expect(response.status).toBe(201)
//       console.log(data)
//       });

//  test("Генерация токена успешно", async () => {
//           const response = await GenerateToken('Test_Karpikcvx32456','Test123@')
//           const data = await response.json()
//           expect(response.status).toBe(200)
//           expect(data.status).toBe("Success")
//           expect(data.result).toBe('User authorized successfully.')
//     console.log(data.token);
//   });
// test("Генерация токена с ошибкой", async () => {
//   const response = await GenerateToken('Test_Karpikcvx32456','неверный_пароль')
//   const data = await response.json()
//   expect(response.status).toBe(200)
//   expect(data.status).toBe("Failed")
//   expect(data.result).toBe('User authorization failed.')

// })
// })

// async function createUser(userName, password){
//   const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
//     method:'post',
//     body: JSON.stringify({
//       userName: userName,
//       password: password
//     }),
//     headers: { "Content-Type": "application/json" },
//     })
//   return response;
// }

// async function GenerateToken(userName, password){
//   const token = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
//     method:'post',
//     body: JSON.stringify({
//       userName: userName,
//       password: password
//     }),
//     headers: { "Content-Type": "application/json" },
//     })
//   return token;
// }

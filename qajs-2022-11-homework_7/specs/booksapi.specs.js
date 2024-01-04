import supertest from 'supertest';
import user from "../helper/user";
import config from "../config";

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

//Тесты из домашки

test('Успешная авторизация с правильным логином и паролем', async () =>{
    const res = await user.login(config.credentials)
    expect(res.status).toBe(200)
    expect(typeof res.body.token).toEqual('string')
    });
    
//Создание нового пользователя    
async function createUser(userName, password){
  const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
    method:'post',
    body: JSON.stringify({
      userName: userName,
      password: password
    }),
    headers: { "Content-Type": "application/json" },
    })
  return response;
}

async function GenerateToken(userName, password){
  const token = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
    method:'post',
    body: JSON.stringify({
      userName: userName,
      password: password
    }),
    headers: { "Content-Type": "application/json" },
    })
  return token;
}



describe("5 test for bookstore", () => {
test("создание пользователя c ошибкой, логин уже используется", async () => {
    const response = await createUser('Test','Test123@')
    const data = await response.json()
    expect(response.status).toBe(406)
    expect(data.code).toBe("1204")
    expect(data.message).toBe("User exists!") 
  });

    test("Создание пользователя c ошибкой, пароль не подходит", async () => {
      const response = await createUser('Test','Test@')
      const data = await response.json()
      expect(response.status).toBe(400)
      expect(data.code).toBe('1300')
      expect(data.message).toContain("Passwords must have at least one non alphanumeric character")
   });

test("Создание пользователя успешно", async () => {
      const response = await createUser('Test_Karpikcvx32456','Test123@')
      const data = await response.json()
      expect(response.status).toBe(201)
      console.log(data)
      });
   
/* test("Удаление пользователя успешно", async () => {
        const response = await createUser('Test_Karpikcvx32456','Test123@')
        const data = await response.json()
        expect(response.status).toBe(201)
        console.log(data)
        }); */

 test("Генерация токена успешно", async () => {
          const response = await GenerateToken('Test_Karpikcvx32456','Test123@')
          const data = await response.json()
          expect(response.status).toBe(200)
          expect(data.status).toBe("Success") 
          expect(data.result).toBe('User authorized successfully.')
    console.log(data.token);
  });
test("Генерация токена с ошибкой", async () => {
  const response = await GenerateToken('Test_Karpikcvx32456','неверный_пароль')
  const data = await response.json()
  expect(response.status).toBe(200)
  expect(data.status).toBe("Failed") 
  expect(data.result).toBe('User authorization failed.') 

})
})

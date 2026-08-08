function request1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("request1 done");
      resolve("A");
    }, 1000);
  });
}

async function run() {
  const result = await request1();
  console.log(result);
  console.log("End");
}

run();

//neu tu async + await:
// (sau 1 giây)
// request1 done
// A
// End
//neu chi co await:
//bao loi await phai duoc di cung async
//neu chi co async:
//Promise { <pending> }
// End
// (sau 1 giây)
// request1 done
//vi ko doi, ma in ra ngay thi result tra ve Promis(<pending>), sau khi promise no chay xong
//no tra ve "A" nhung luc nay ko co bien doi de lay, va cung da ket thuc chay roi

async function run() {
  const query1 = await request1();

  const query2 = await request2();

  console.log("hello");

  const query3 = await request3();
}

request1()
  .then((query1) => {
    return request2();
  })
  .then((query2) => {
    console.log("hello");
    return request3();
  })
  .then((query3) => {
    // Kết thúc
  })
  .catch((err) => {
    console.error(err);
  });

//hoac

request1().then((query1) => {
  request2().then((query2) => {
    console.log("hello");

    request3().then((query3) => {
      // End
    });
  });
});

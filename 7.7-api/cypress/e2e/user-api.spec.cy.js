describe("API-тесты пользователей", () => {
  let userId;
  let testFirstName;
  let testSurName;

  beforeEach(() => {
    userId = Math.floor(Math.random() * 100000);
    testFirstName = `Test${userId}`;
    testSurName = `Testov${userId}`;
  });

  it("Создание пользователя", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/users",
      body: {
        id: userId,
        firstName: testFirstName,
        surName: testSurName
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("firstName", testFirstName);
      expect(res.body).to.have.property("surName", testSurName);
    });
  });

  it("Редактирование пользователя", () => {
    const newFirstName = `Updated${userId}`;
    const newSurName = `Updatedov${userId}`;
    
    cy.request("POST", "http://localhost:8080/users", {
      id: userId,
      firstName: testFirstName,
      surName: testSurName
    }).then((res) => {
      const createdId = res.body.id;
      
      cy.request({
        method: "PUT",
        url: `http://localhost:8080/users/${createdId}?firstName=${newFirstName}&surName=${newSurName}`,
      }).then((putRes) => {
        expect(putRes.status).to.eq(200);
      });
    });
  });

  it("Удаление пользователя", () => {
    cy.request("POST", "http://localhost:8080/users", {
      id: userId,
      firstName: testFirstName,
      surName: testSurName
    }).then((res) => {
      const createdId = res.body.id;
      
      cy.request("DELETE", `http://localhost:8080/users/${createdId}`).then((delRes) => {
        expect(delRes.status).to.eq(200);
      });
    });
  });
});
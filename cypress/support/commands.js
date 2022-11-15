import querystring from "query-string";

Cypress.Commands.add("launchApp", () => {
  cy.setCookie("utagdb", "true");
  cy.setCookie("utag.cfg.utagdb", "true");
  cy.setCookie("utag.data", "true");
  cy.setCookie(
    "SC_ANALYTICS_GLOBAL_COOKIE",
    "40145f4edbf64e088352fb7ba36cd1d2|True"
  );
  cy.visit("/", {
    headers: {
      "Accept": "application/json, text/plain, */*",
      "User-Agent": "axios/0.18.0"
    },
    timeout: 60000,
  });
});

Cypress.Commands.add("isVisible", (selector) => {
  cy.get(selector).should("be.visible");
});

Cypress.Commands.add("isXpathVisible", (selector) => {
  cy.xpath(selector).should("be.visible");
});

Cypress.Commands.add("isPresent", (selector) => {
  cy.get(selector).should("exist");
});

Cypress.Commands.add("isNotPresent", (selector) => {
  cy.get(selector).should("not.exist");
});

Cypress.Commands.add("isEnabled", (selector) => {
  cy.get(selector).should("not.be.disabled");
});

Cypress.Commands.add("interceptAdobeAnalytics", () => {
  cy.wait("@adobe-analytics")
    .get("@adobe-analytics")
    .then((xhr) => {
      console.log("Adobe-Analytics Response:", xhr);
      const formattedRequestBody = querystring.parse(xhr.request.body);
      const formattedJsonRequestBody = JSON.stringify(formattedRequestBody);
      cy.log("Formatted Json Request Body is:", formattedJsonRequestBody);

      expect(xhr.request.body).to.include("AQB", 1);
      expect(xhr.request.body).to.include("AQE", 1);
      expect(xhr.request.body).to.include("events", "event125");
      expect(xhr.request.body).to.include("events", "event126");
      expect(xhr.request.body).to.include(
        "g",
        "https://www.xfinity.com/learn/mobile-service"
      );
      expect(xhr.request.body).to.include(
        "c73",
        "AA Hosted by Adobe Launch | 11182020"
      );
      expect(xhr.request.body).to.include(
        "c25",
        "resi|sales|shop||home|page load"
      );
      expect(xhr.request.body).to.include("id", "281EA5D7457AAC65");
      expect(xhr.request.body).to.include("c44", "responsive|df learn 2");
      expect(xhr.request.body).to.include("c45", "new");
      expect(xhr.request.body).to.include("c50", "8a8b8ba1-83f5-473d-a11d-434edbd82bb8");
      expect(xhr.request.body).to.include("c55", "resi|sales");

      const requestUrl = xhr.request.url;
      cy.log("Request Url:", requestUrl);

      expect(xhr.response.statusCode).to.equal(200);
      expect(xhr.response.statusMessage).to.equal("OK");

      const responseUrl = xhr.response.url;
      cy.log("Response Url:", responseUrl);

      expect(xhr.response.body).to.include("id", "1523655-1668505568");
      expect(xhr.response.body).to.include(
        "c",
        "https://googleads.g.doubleclick.net/pagead/viewthroughconversion/1023869955/?value=1.00&currency_code=USD&label=dAmVCKnhr2wQg4ic6AM&guid=ON&script=0"
      );
      expect(xhr.response.body).to.include("uuid");
      expect(responseUrl).to.deep.equal(requestUrl); // Validate b/ss adobe analytics url
    });
});

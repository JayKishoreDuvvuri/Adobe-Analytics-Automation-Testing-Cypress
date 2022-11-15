/* Scenario: 
Capture adobe analytics tracking on clicking on Mobile > Overview tab

Scenario Description: 
Log in to the app and navigate to Overview page. Click on Mobile > Overview and capture the 
Adobe analytics events fired.

Test Steps:
1.	Log in to the APP
2.	Hover to the Mobile tab and click on Overview option
3.	Perform a GET request and get the responses from Mobile Tab URI's
4.	Verify the adobe events fired on clicking the New Mobile > Overview tab
5.	Assert the events data
*/

import {
  landingPageOverviewTitle,
  mobileOverviewTab,
  mobileTab,
  mobileOverviewPageTitle,
} from "../selectors/locators";

describe("Adobe Analytics Tracking Test", () => {
  before(() => {
    cy.intercept(
      "POST",
      "https://metrics.xfinity.com/b/ss/comcastdotcomprod/10/JS-2.22.0-LCXS/s**"
    ).as("adobe-analytics");
  });

  it("Login to see the adobe tracking event when clicking on Mobile > Overview tab", () => {
    cy.launchApp();
    cy.title().should("eq", landingPageOverviewTitle);
    cy.url().should("contain", Cypress.env("landingPageUrl"));
    cy.isVisible(mobileTab);
    cy.get(mobileTab).trigger("mouseover");
    cy.xpath(mobileOverviewTab).click();
    cy.wait(500);
    cy.interceptAdobeAnalytics();
    cy.title().should("eq", mobileOverviewPageTitle);
    cy.url().then((url) => {
      const currentUrl = url;
      cy.log("current url is:", currentUrl);
      expect(currentUrl).to.equal(Cypress.env("mobileOverviewPageUrl"));
    });
  });
});  
